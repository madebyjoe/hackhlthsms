const { promisify } = require("util");
const request = require("request");
const rp = require("request-promise-native");
const cheerio = require("cheerio");
const graph = require("fbgraph");
const { LastFmNode } = require("lastfm");
const tumblr = require("tumblr.js");
const GitHub = require("@octokit/rest");
const Twit = require("twit");
const stripe = require("stripe")(process.env.STRIPE_SKEY);
const twilio = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const Linkedin = require("node-linkedin")(
  process.env.LINKEDIN_ID,
  process.env.LINKEDIN_SECRET,
  process.env.LINKEDIN_CALLBACK_URL
);
const clockwork = require("clockwork")({ key: process.env.CLOCKWORK_KEY });
const paypal = require("paypal-rest-sdk");
const lob = require("lob")(process.env.LOB_KEY);
const ig = require("instagram-node").instagram();
const { Venues, Users } = require("node-foursquare")({
  secrets: {
    clientId: process.env.FOURSQUARE_ID,
    clientSecret: process.env.FOURSQUARE_SECRET,
    redirectUrl: process.env.FOURSQUARE_REDIRECT_URL
  },
  foursquare: {
    mode: "foursquare",
    version: 20140806
  }
});

const SoftheonWalletApi = {
  make_payment: () => new Promise(resolve => setTimeout(resolve, 4000))
};

/*
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render("api/index", {
    title: "API Examples"
  });
};

/**
 *  POST /api/notify
 */

exports.sendSmsNotification = (req, res, next) => {
  const message = {
    to: "+14083345956",
    from: "+12062023476",
    body:
      "This is a reminder that you have a bill of $640.45 due on May 10, 2018. To avoid a late fee of $45, would you like to pay now?"
  };
  twilio.messages.create(message, (err, responseData) => {
    if (err) {
      return next(err.message);
    }
    req.flash("success", { msg: `Text sent to ${responseData.to}.` });
    res.redirect("/api/twilio");
  });
};

/**
 * POST /api/sms
 */
exports.handleSms = async (req, res, next) => {
  let twiml = new MessagingResponse();
  console.log(req.body.From);

  if (req.body.Body == "yes" || req.body.Body == "Yes") {
    console.log("yes");
    twiml.message(`What is the amount you would like to pay?`);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } else if (req.body.Body == "confirm" || req.body.Body == "Confirm") {
    console.log("confirm");
    const done = await SoftheonWalletApi.make_payment();
    twiml.message("Okay, payment confirmed!");
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } else if (!isNaN(parseFloat(req.body.Body))) {
    console.log("number");

    twiml.message(
      `Please confirm you would like to pay $${
        req.body.Body
      } with your default payment method`
    );
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } else {
    console.log("classify");

    const options = {
      method: "POST",
      uri: "http://localhost:8000/classify",
      body: {
        sentence: req.body.Body
      },
      json: true // Automatically stringifies the body to JSON
    };

    try {
      const intent = await rp(options);
      console.log("intent", intent);
      if (intent.intent == "make_payment") {
        twiml.message(
          `You have a balance of $98.54. Would you like to pay this balance?`
        );
        // message.body(
        //   `You have a balance of $98.54. Would you like to pay this balance?`
        // );
        // message.media(
        //   "https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg"
        // );
      } else if (intent.intent == "history") {
        twiml.message("Here is your recent transaction history");
      } else if (intent.intent == "remove_payment") {
        twiml.message("You need multiple payment methods to remove one");
      } else if (intent.intent == "summary") {
        twiml.message("Here is your account overview:");
      } else if (intent.intent == "autopay") {
        twiml.message(
          "Sure I can help set your autopay up. Would you like to use your default payment method?"
        );
      } else if (intent.intent == "outstanding_balance") {
        twiml.message("You have an outstanding balance of $0");
      } else if (intent.intent == "add_payment") {
        twiml.message(
          "I can definitely help you with that. Would you like to add a credit card or a bank account?"
        );
      } else if (intent.intent == "cancel") {
        twiml.message("Sure. Is there anything else I can help you with?");
      } else if (intent.intent == "help") {
        twiml.message(
          "I can help you making a payment, viewing history, setting up autopay, and adding payment methods"
        );
      } else {
        twiml.message(`${intent.intent}`);
      }
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    } catch (err) {
      return next(err);
    }
  }
};

/**
 * GET /api/softheon
 */
exports.createWallet = async (req, res, next) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2RkRDMUQ4RDlGRDYyQTZFNjZFQzE4MEVENzQ1NDZBRUI0RTBEODMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJkdjNCMk5uOVlxYm1ic0dBN1hSVWF1dE9EWU0ifQ.eyJuYmYiOjE1MjU2MjI2OTgsImV4cCI6MTUyNTYyNjI5OCwiaXNzIjoiaHR0cHM6Ly9oYWNrLnNvZnRoZW9uLmlvL29hdXRoMiIsImF1ZCI6WyJodHRwczovL2hhY2suc29mdGhlb24uaW8vb2F1dGgyL3Jlc291cmNlcyIsInBheW1lbnRhcGkiXSwiY2xpZW50X2lkIjoiMjY0M2I5ZTctM2E2YS00MjBiLTk2M2UtMTUzNDJlYzJkMDkzIiwic2NvcGUiOlsicGF5bWVudGFwaSJdfQ.WSXglAscyPEQO8g7QXgk53H9ZDDn3YMJvsjYOpFBDccQmNJNceZ9dzczj-9drevXPr7mldQQ1j12hbx4uSITVSHKOw2qEmMnqyekJz_Y3pm3sUHpFRF4beNJnmzj8SK1vRcyPIAqkTmv_h0N4668AQp6fiSg3hJznEk1xUeRmaqcCol55hi-9IMcHFdihB8X6L05mcgSyC2HlAAShK2v8WRutLwNPNNNh7rVK1PEv8VIlSH48J0CbOMJfy-QF7nkMyrPed0BdM-E3_OL26vP5IoVrJSRosGiaX1ZRBMjSGl51LENu4uBMBDoF0mSPK6d70EuxfSHtIgTfCjPnX2ASCXFAJ_uVNOTFMzZxxxkZQwgIV9uDgCbu6C9JaoO3nhmolBqQd5De8Vs_oQt1IOy4ktQ1VvLnHP5hhHSI_iCxIrgph_mt4WEuKS8GfOZZmM_P1ZjOlExv2ooB5Hme8Kvhxzhv4KNROnS2VRhqTht7tViZnnWkLJrC6OqHwKYy609d2-ubzGlnnpXQmHDvfmg2B_JtSqIzpFAZDnUKCylXIIE4raua1bkpjfyL6lsqy5RsSdas8rX3UuptmhpPQatIHj8ATQJV_PsWexmTwfaah3kdyWVTKKa_2d6L0oGLLE47tlWMXFnVPyXtADbMlZOcNbChxXPZN_zx5TfwGihi54";

  request.post(
    "https://hack.softheon.io/api/payments/v1/wallet",
    { headers: { Authorization: `Bearer ${token}` } },
    (err, request, body) => {
      if (err) {
        return next(err);
      }
      console.log("status code", request);
      if (request.statusCode !== 201) {
        req.flash("errors", { msg: JSON.parse(body).message });
        return res.redirect("/api/softheon");
      }
      req.flash("success", { msg: "Wallet created" });
    }
  );
};

// exports.getSoftheonToken = (req, res, next) => {
//   const qs = require("querystring");
//   const http = require("https");

//   const options = {
//     method: "POST",
//     hostname: ["hack", "softheon", "io"],
//     path: ["oauth2", "connect", "token"],
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   };

//   // let req = http.request(options, function(res) {
//   //   let chunks = [];

//   //   res.on("data", function(chunk) {
//   //     chunks.push(chunk);
//   //   });

//   //   res.on("end", function() {
//   //     var body = Buffer.concat(chunks);
//   //     console.log(body.toString());
//   //   });
//   // });

//   req.write(
//     qs.stringify({
//       grant_type: "client_credentials",
//       scope: "paymentapi",
//       client_id: process.env.SOFTHEON_ID,
//       client_secret: process.env.SOFTHEON_SECRET
//     })
//   );
//   req.end();
// };

/**
 * GET /api/foursquare
 * Foursquare API example.
 */
exports.getFoursquare = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "foursquare");
  try {
    const getTrendingAsync = promisify(Venues.getTrending);
    const getVenueAsync = promisify(Venues.getVenue);
    const getCheckinsAsync = promisify(Users.getCheckins);
    const trendingVenues = await getTrendingAsync(
      "40.7222756",
      "-74.0022724",
      { limit: 50 },
      token.accessToken
    );
    const venueDetail = await getVenueAsync(
      "49da74aef964a5208b5e1fe3",
      token.accessToken
    );
    const userCheckins = await getCheckinsAsync(
      "self",
      null,
      token.accessToken
    );
    return res.render("api/foursquare", {
      title: "Foursquare API",
      trendingVenues,
      venueDetail,
      userCheckins
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/tumblr
 * Tumblr API example.
 */
exports.getTumblr = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "tumblr");
  const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_KEY,
    consumer_secret: process.env.TUMBLR_SECRET,
    token: token.accessToken,
    token_secret: token.tokenSecret
  });
  client.blogPosts("mmosdotcom.tumblr.com", { type: "photo" }, (err, data) => {
    if (err) {
      return next(err);
    }
    res.render("api/tumblr", {
      title: "Tumblr API",
      blog: data.blog,
      photoset: data.posts[0].photos
    });
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(
    `${
      req.user.facebook
    }?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`,
    (err, profile) => {
      if (err) {
        return next(err);
      }
      res.render("api/facebook", {
        title: "Facebook API",
        profile
      });
    }
  );
};

/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
exports.getScraping = (req, res, next) => {
  request.get("https://news.ycombinator.com/", (err, request, body) => {
    if (err) {
      return next(err);
    }
    const $ = cheerio.load(body);
    const links = [];
    $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
      links.push($(element));
    });
    res.render("api/scraping", {
      title: "Web Scraping",
      links
    });
  });
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = async (req, res, next) => {
  const github = new GitHub();
  try {
    const { data: repo } = await github.repos.get({
      owner: "sahat",
      repo: "hackathon-starter"
    });
    res.render("api/github", {
      title: "GitHub API",
      repo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/aviary
 * Aviary image processing example.
 */
exports.getAviary = (req, res) => {
  res.render("api/aviary", {
    title: "Aviary API"
  });
};

/**
 * GET /api/nyt
 * New York Times API example.
 */
exports.getNewYorkTimes = (req, res, next) => {
  const query = {
    "list-name": "young-adult",
    "api-key": process.env.NYT_KEY
  };
  request.get(
    { url: "http://api.nytimes.com/svc/books/v2/lists", qs: query },
    (err, request, body) => {
      if (err) {
        return next(err);
      }
      if (request.statusCode === 403) {
        return next(new Error("Invalid New York Times API Key"));
      }
      const books = JSON.parse(body).results;
      res.render("api/nyt", {
        title: "New York Times API",
        books
      });
    }
  );
};

/**
 * GET /api/lastfm
 * Last.fm API example.
 */
exports.getLastfm = async (req, res, next) => {
  const lastfm = new LastFmNode({
    api_key: process.env.LASTFM_KEY,
    secret: process.env.LASTFM_SECRET
  });
  const getArtistInfo = () =>
    new Promise((resolve, reject) => {
      lastfm.request("artist.getInfo", {
        artist: "Roniit",
        handlers: {
          success: resolve,
          error: reject
        }
      });
    });
  const getArtistTopTracks = () =>
    new Promise((resolve, reject) => {
      lastfm.request("artist.getTopTracks", {
        artist: "Roniit",
        handlers: {
          success: ({ toptracks }) => {
            resolve(toptracks.track.slice(0, 10));
          },
          error: reject
        }
      });
    });
  const getArtistTopAlbums = () =>
    new Promise((resolve, reject) => {
      lastfm.request("artist.getTopAlbums", {
        artist: "Roniit",
        handlers: {
          success: ({ topalbums }) => {
            resolve(topalbums.album.slice(0, 3));
          },
          error: reject
        }
      });
    });
  try {
    const { artist: artistInfo } = await getArtistInfo();
    const topTracks = await getArtistTopTracks();
    const topAlbums = await getArtistTopAlbums();
    const artist = {
      name: artistInfo.name,
      image: artistInfo.image ? artistInfo.image.slice(-1)[0]["#text"] : null,
      tags: artistInfo.tags ? artistInfo.tags.tag : [],
      bio: artistInfo.bio ? artistInfo.bio.summary : "",
      stats: artistInfo.stats,
      similar: artistInfo.similar ? artistInfo.similar.artist : [],
      topTracks,
      topAlbums
    };
    res.render("api/lastfm", {
      title: "Last.fm API",
      artist
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/twitter
 * Twitter API example.
 */
exports.getTwitter = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "twitter");
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  try {
    const { statuses: tweets } = await T.get("search/tweets", {
      q: "nodejs since:2013-01-01",
      geocode: "40.71448,-74.00598,5mi",
      count: 10
    });
    res.render("api/twitter", {
      title: "Twitter API",
      tweets
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/twitter
 * Post a tweet.
 */
exports.postTwitter = (req, res, next) => {
  req.assert("tweet", "Tweet cannot be empty").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/api/twitter");
  }

  const token = req.user.tokens.find(token => token.kind === "twitter");
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.post("statuses/update", { status: req.body.tweet }, err => {
    if (err) {
      return next(err);
    }
    req.flash("success", { msg: "Your tweet has been posted." });
    res.redirect("/api/twitter");
  });
};

/**
 * GET /api/steam
 * Steam API example.
 */
exports.getSteam = async (req, res, next) => {
  const steamId = req.user.steam;
  const params = { l: "english", steamid: steamId, key: process.env.STEAM_KEY };
  const getAsync = promisify(request.get);

  // get the list of the recently played games, pick the most recent one and get its achievements
  const getPlayerAchievements = () =>
    getAsync({
      url:
        "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/",
      qs: params,
      json: true
    }).then(({ request, body }) => {
      if (request.statusCode === 401) {
        throw new Error("Invalid Steam API Key");
      }
      if (body.response.total_count > 0) {
        params.appid = body.response.games[0].appid;
        return getAsync({
          url:
            "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/",
          qs: params,
          json: true
        }).then(({ request, body }) => {
          if (request.statusCode === 401) {
            throw new Error("Invalid Steam API Key");
          }
          return body;
        });
      }
    });
  const getPlayerSummaries = () => {
    params.steamids = steamId;
    return getAsync({
      url: "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
      qs: params,
      json: true
    }).then(({ request, body }) => {
      if (request.statusCode === 401) {
        throw Error("Missing or Invalid Steam API Key");
      }
      return body;
    });
  };
  const getOwnedGames = () => {
    params.include_appinfo = 1;
    params.include_played_free_games = 1;
    return getAsync({
      url: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",
      qs: params,
      json: true
    }).then(({ request, body }) => {
      if (request.statusCode === 401) {
        throw new Error("Missing or Invalid Steam API Key");
      }
      return body;
    });
  };
  try {
    const playerAchievements = await getPlayerAchievements();
    const playerSummaries = await getPlayerSummaries();
    const ownedGames = await getOwnedGames();
    res.render("api/steam", {
      title: "Steam Web API",
      ownedGames: ownedGames.response,
      playerAchievemments: playerAchievements
        ? playerAchievements.playerstats
        : null,
      playerSummary: playerSummaries.response.players[0]
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/stripe
 * Stripe API example.
 */
exports.getStripe = (req, res) => {
  res.render("api/stripe", {
    title: "Stripe API",
    publishableKey: process.env.STRIPE_PKEY
  });
};

/**
 * POST /api/stripe
 * Make a payment.
 */
exports.postStripe = (req, res) => {
  const { stripeToken, stripeEmail } = req.body;
  stripe.charges.create(
    {
      amount: 395,
      currency: "usd",
      source: stripeToken,
      description: stripeEmail
    },
    err => {
      if (err && err.type === "StripeCardError") {
        req.flash("errors", { msg: "Your card has been declined." });
        return res.redirect("/api/stripe");
      }
      req.flash("success", { msg: "Your card has been successfully charged." });
      res.redirect("/api/stripe");
    }
  );
};

/**
 * GET /api/twilio
 * Twilio API example.
 */
exports.getTwilio = (req, res) => {
  res.render("api/twilio", {
    title: "Twilio API"
  });
};

/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
exports.postTwilio = (req, res, next) => {
  req.assert("number", "Phone number is required.").notEmpty();
  req.assert("message", "Message cannot be blank.").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/api/twilio");
  }

  const message = {
    to: req.body.number,
    from: "+15005550006",
    body: req.body.message
  };
  twilio.messages.create(message, (err, responseData) => {
    if (err) {
      return next(err.message);
    }
    req.flash("success", { msg: `Text sent to ${responseData.to}.` });
    res.redirect("/api/twilio");
  });
};

/**
 * GET /api/clockwork
 * Clockwork SMS API example.
 */
exports.getClockwork = (req, res) => {
  res.render("api/clockwork", {
    title: "Clockwork SMS API"
  });
};

/**
 * POST /api/clockwork
 * Send a text message using Clockwork SMS
 */
exports.postClockwork = (req, res, next) => {
  const message = {
    To: req.body.telephone,
    From: "Hackathon",
    Content: "Hello from the Hackathon Starter"
  };
  clockwork.sendSms(message, (err, responseData) => {
    if (err) {
      return next(err.errDesc);
    }
    req.flash("success", {
      msg: `Text sent to ${responseData.responses[0].to}`
    });
    res.redirect("/api/clockwork");
  });
};

/**
 * GET /api/linkedin
 * LinkedIn API example.
 */
exports.getLinkedin = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "linkedin");
  const linkedin = Linkedin.init(token.accessToken);
  linkedin.people.me((err, $in) => {
    if (err) {
      return next(err);
    }
    res.render("api/linkedin", {
      title: "LinkedIn API",
      profile: $in
    });
  });
};

/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.getInstagram = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "instagram");
  ig.use({
    client_id: process.env.INSTAGRAM_ID,
    client_secret: process.env.INSTAGRAM_SECRET
  });
  ig.use({ access_token: token.accessToken });
  try {
    const userSearchAsync = promisify(ig.user_search);
    const userAsync = promisify(ig.user);
    const userSelfMediaRecentAsync = promisify(ig.user_self_media_recent);
    const searchByUsername = await userSearchAsync("richellemead");
    const searchByUserId = await userAsync("175948269");
    const myRecentMedia = await userSelfMediaRecentAsync();
    res.render("api/instagram", {
      title: "Instagram API",
      usernames: searchByUsername,
      userById: searchByUserId,
      myRecentMedia
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/paypal
 * PayPal SDK example.
 */
exports.getPayPal = (req, res, next) => {
  paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET
  });

  const paymentDetails = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_RETURN_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL
    },
    transactions: [
      {
        description: "Hackathon Starter",
        amount: {
          currency: "USD",
          total: "1.99"
        }
      }
    ]
  };

  paypal.payment.create(paymentDetails, (err, payment) => {
    if (err) {
      return next(err);
    }
    const { links, id } = payment;
    req.session.paymentId = id;
    for (let i = 0; i < links.length; i++) {
      if (links[i].rel === "approval_url") {
        res.render("api/paypal", {
          approvalUrl: links[i].href
        });
      }
    }
  });
};

/**
 * GET /api/paypal/success
 * PayPal SDK example.
 */
exports.getPayPalSuccess = (req, res) => {
  const { paymentId } = req.session;
  const paymentDetails = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, paymentDetails, err => {
    res.render("api/paypal", {
      result: true,
      success: !err
    });
  });
};

/**
 * GET /api/paypal/cancel
 * PayPal SDK example.
 */
exports.getPayPalCancel = (req, res) => {
  req.session.paymentId = null;
  res.render("api/paypal", {
    result: true,
    canceled: true
  });
};

/**
 * GET /api/lob
 * Lob API example.
 */
exports.getLob = (req, res, next) => {
  lob.routes.list({ zip_codes: ["10007"] }, (err, routes) => {
    if (err) {
      return next(err);
    }
    res.render("api/lob", {
      title: "Lob API",
      routes: routes.data[0].routes
    });
  });
};

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render("api/upload", {
    title: "File Upload"
  });
};

exports.postFileUpload = (req, res) => {
  req.flash("success", { msg: "File was uploaded successfully." });
  res.redirect("/api/upload");
};

/**
 * GET /api/pinterest
 * Pinterest API example.
 */
exports.getPinterest = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === "pinterest");
  request.get(
    {
      url: "https://api.pinterest.com/v1/me/boards/",
      qs: { access_token: token.accessToken },
      json: true
    },
    (err, request, body) => {
      if (err) {
        return next(err);
      }
      res.render("api/pinterest", {
        title: "Pinterest API",
        boards: body.data
      });
    }
  );
};

/**
 * POST /api/pinterest
 * Create a pin.
 */
exports.postPinterest = (req, res, next) => {
  req.assert("board", "Board is required.").notEmpty();
  req.assert("note", "Note cannot be blank.").notEmpty();
  req.assert("image_url", "Image URL cannot be blank.").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/api/pinterest");
  }

  const token = req.user.tokens.find(token => token.kind === "pinterest");
  const formData = {
    board: req.body.board,
    note: req.body.note,
    link: req.body.link,
    image_url: req.body.image_url
  };

  request.post(
    "https://api.pinterest.com/v1/pins/",
    { qs: { access_token: token.accessToken }, form: formData },
    (err, request, body) => {
      if (err) {
        return next(err);
      }
      if (request.statusCode !== 201) {
        req.flash("errors", { msg: JSON.parse(body).message });
        return res.redirect("/api/pinterest");
      }
      req.flash("success", { msg: "Pin created" });
      res.redirect("/api/pinterest");
    }
  );
};

exports.getGoogleMaps = (req, res) => {
  res.render("api/google-maps", {
    title: "Google Maps API",
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY
  });
};
