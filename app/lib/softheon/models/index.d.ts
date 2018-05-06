/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as moment from "moment";


/**
 * @class
 * Initializes a new instance of the Address class.
 * @constructor
 * Defines the properties and methods of an address.
 *
 * @member {string} address1 The first line of the street address.  Typcically
 * contains
 * the number and street name.
 * @member {string} [address2] The second line of the street address.
 * Typically contains
 * an apartment number, suite number or department.
 * @member {string} city The city where the address is situated.
 * @member {string} state The state where the address is located.
 * @member {string} zipCode The postal code for the address.
 */
export interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
}

/**
 * @class
 * Initializes a new instance of the BankAccountModel class.
 * @constructor
 * The model sent to the client in response to a GET request for a bank
 * account.
 *
 * @member {number} [id] Gets or sets the identifier.
 * @member {string} [token] The payment token for the bank account.
 * @member {string} [accountNumber] The bank account number.
 * @member {string} routingNumber The routing number of the bank where the bank
 * account was opened.
 * @member {string} type The bank account type. Possible values include:
 * 'Unknown', 'Checking', 'Savings'
 * @member {string} state The state that the bank acocunt is in. Possible
 * values include: 'Unknown', 'New', 'Pending', 'Authorized', 'Disabled'
 * @member {string} [nickname] The aribtrary nickname of the account, used as a
 * way to identify the account.
 * @member {string} accountHolderName The name of the individual or entity that
 * is autorized to make transactions for the bank account.
 * @member {object} accountHolderAddress The mailing address for the account
 * holder.
 * @member {string} [accountHolderAddress.address1] The first line of the
 * street address.  Typcically contains
 * the number and street name.
 * @member {string} [accountHolderAddress.address2] The second line of the
 * street address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [accountHolderAddress.city] The city where the address is
 * situated.
 * @member {string} [accountHolderAddress.state] The state where the address is
 * located.
 * @member {string} [accountHolderAddress.zipCode] The postal code for the
 * address.
 * @member {string} email The email address for the account holder.
 * @member {string} [referenceId] The client application provided reference ID
 * for the bank account.
 * @member {date} [createdTime] The timestamp indicating when the bank account
 * was created.
 * @member {date} [modifiedTime] The timestamp indicating the last time that
 * the details of the bank account were modified.
 */
export interface BankAccountModel {
  id?: number;
  token?: string;
  accountNumber?: string;
  routingNumber: string;
  type: string;
  state: string;
  nickname?: string;
  accountHolderName: string;
  accountHolderAddress: Address;
  email: string;
  referenceId?: string;
  createdTime?: Date;
  modifiedTime?: Date;
}

/**
 * @class
 * Initializes a new instance of the BankAccountRequestModel class.
 * @constructor
 * The request model sent by the client for adding new bank accounts to the
 * payment platform.
 *
 * @member {string} accountNumber The bank account number.
 * @member {string} routingNumber The routing number of the bank where the bank
 * account was opened.
 * @member {string} accountHolderName The name of the individual or entity that
 * is autorized to make transactions for the bank account.
 * @member {object} accountHolderAddress The mailing address for the account
 * holder.
 * @member {string} [accountHolderAddress.address1] The first line of the
 * street address.  Typcically contains
 * the number and street name.
 * @member {string} [accountHolderAddress.address2] The second line of the
 * street address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [accountHolderAddress.city] The city where the address is
 * situated.
 * @member {string} [accountHolderAddress.state] The state where the address is
 * located.
 * @member {string} [accountHolderAddress.zipCode] The postal code for the
 * address.
 * @member {string} type The bank account type. Possible values include:
 * 'Unknown', 'Checking', 'Savings'
 * @member {string} [referenceId] The client application provided reference ID
 * for the bank account.
 * @member {string} [nickname] The aribtrary nickname of the account, used as a
 * way to identify the account.
 * @member {string} email The email address for the account holder.
 * @member {string} [redirectUrl] The url that the client will be redirected to
 * after the bank account has been created.
 */
export interface BankAccountRequestModel {
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
  accountHolderAddress: Address;
  type: string;
  referenceId?: string;
  nickname?: string;
  email: string;
  redirectUrl?: string;
}

/**
 * @class
 * Initializes a new instance of the BankAccountResponseModel class.
 * @constructor
 * The response model that is returned to the client when a new bank account is
 * added
 * to the platform
 *
 * @member {string} [token] The payment token for the bank account.
 * @member {string} [bankAccountState] The state that the bank acocunt is in.
 * Possible values include: 'Unknown', 'New', 'Pending', 'Authorized',
 * 'Disabled'
 * @member {string} [redirectUrl] The url that the client will be redirected to
 * after the bank account has been created.
 */
export interface BankAccountResponseModel {
  token?: string;
  bankAccountState?: string;
  redirectUrl?: string;
}

/**
 * @class
 * Initializes a new instance of the UpdateBankAccountModel class.
 * @constructor
 * The request model sent by the client for updating bank accounts in the
 * payment platform.
 *
 * @member {string} [token] The payment token for the bank account.
 * @member {string} [nickname] The aribtrary nickname of the account, used as a
 * way to identify the account.
 * @member {string} accountHolderName The name of the individual or entity that
 * is autorized to make transactions for the bank account.
 * @member {object} accountHolderAddress The mailing address for the account
 * holder.
 * @member {string} [accountHolderAddress.address1] The first line of the
 * street address.  Typcically contains
 * the number and street name.
 * @member {string} [accountHolderAddress.address2] The second line of the
 * street address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [accountHolderAddress.city] The city where the address is
 * situated.
 * @member {string} [accountHolderAddress.state] The state where the address is
 * located.
 * @member {string} [accountHolderAddress.zipCode] The postal code for the
 * address.
 * @member {string} email The email address for the account holder.
 */
export interface UpdateBankAccountModel {
  token?: string;
  nickname?: string;
  accountHolderName: string;
  accountHolderAddress: Address;
  email: string;
}

/**
 * @class
 * Initializes a new instance of the Bin class.
 * @constructor
 * Defines a BIN (bank identification number)
 *
 * @member {string} [bin] Gets the bin.
 * @member {string} [brand] Gets or sets the brand. Possible values include:
 * 'Unknown', 'Visa', 'MasterCard', 'Amex', 'Discover'
 * @member {boolean} [isDebitCard] Gets or sets a value indicating whether this
 * instance is debit.
 * @member {boolean} [isCheckCard] Gets or sets a value indicating whether this
 * instance is check card.
 * @member {boolean} [isGiftCard] Gets or sets a value indicating whether this
 * instance is gift card.
 * @member {boolean} [isCorporateCard] Gets or sets a value indicating whether
 * this instance is corporate card.
 * @member {boolean} [isFleetCard] Gets or sets a value indicating whether this
 * instance is fleet card.
 * @member {boolean} [isPrepaidCard] Gets or sets a value indicating whether
 * this instance is prepaid card.
 */
export interface Bin {
  bin?: string;
  readonly brand?: string;
  isDebitCard?: boolean;
  isCheckCard?: boolean;
  isGiftCard?: boolean;
  isCorporateCard?: boolean;
  isFleetCard?: boolean;
  isPrepaidCard?: boolean;
}

/**
 * @class
 * Initializes a new instance of the CheckoutResponseModel class.
 * @constructor
 * Checkout Response
 *
 * @member {number} [checkoutId] Gets or sets the checkout identifier.
 * @member {string} [clientId] Gets or sets the client identifier.
 * @member {string} [redirectUrl] Gets or sets the redirect URL.
 * @member {string} [referenceId] Gets or sets the reference identifier.
 * @member {number} [amount] Gets or sets the amount.
 * @member {string} [nameOnAccount] Gets or sets the name on account.
 * @member {date} [expirationDate] Gets or sets the expiration date.
 * @member {boolean} [enableBillingInformation] Gets or sets a value indicating
 * whether [enable billing information].
 * @member {object} [billingAddress] Gets or sets the billing address.
 * @member {string} [billingAddress.address1] The first line of the street
 * address.  Typcically contains
 * the number and street name.
 * @member {string} [billingAddress.address2] The second line of the street
 * address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [billingAddress.city] The city where the address is
 * situated.
 * @member {string} [billingAddress.state] The state where the address is
 * located.
 * @member {string} [billingAddress.zipCode] The postal code for the address.
 * @member {string} [email] Gets or sets the email.
 * @member {boolean} [requireEmail] Gets or sets a value indicating whether
 * [require email].
 * @member {boolean} [enableSaveOption] Gets or sets a value indicating whether
 * [enable save option].
 */
export interface CheckoutResponseModel {
  checkoutId?: number;
  clientId?: string;
  redirectUrl?: string;
  referenceId?: string;
  amount?: number;
  nameOnAccount?: string;
  expirationDate?: Date;
  enableBillingInformation?: boolean;
  billingAddress?: Address;
  email?: string;
  requireEmail?: boolean;
  enableSaveOption?: boolean;
}

/**
 * @class
 * Initializes a new instance of the CheckoutRequestModel class.
 * @constructor
 * Checkout request model
 *
 * @member {string} [redirectUrl] Gets or sets the redirect URL.
 * @member {string} [referenceId] Gets or sets the reference identifier.
 * @member {number} [amount] Gets or sets the amount.
 * @member {string} [nameOnAccount] Gets or sets the name on account.
 * @member {date} [expirationDate] Gets or sets the expiration date.
 * @member {boolean} [enableBillingInformation] Gets or sets a value indicating
 * whether [enable billing information].
 * @member {object} [billingAddress] Gets or sets the billing address.
 * @member {string} [billingAddress.address1] The first line of the street
 * address.  Typcically contains
 * the number and street name.
 * @member {string} [billingAddress.address2] The second line of the street
 * address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [billingAddress.city] The city where the address is
 * situated.
 * @member {string} [billingAddress.state] The state where the address is
 * located.
 * @member {string} [billingAddress.zipCode] The postal code for the address.
 * @member {string} [email] Gets or sets the email.
 * @member {boolean} [requireEmail] Gets or sets a value indicating whether
 * [require email].
 * @member {boolean} [enableSaveOption] Gets or sets a value indicating whether
 * [enable save option].
 */
export interface CheckoutRequestModel {
  redirectUrl?: string;
  referenceId?: string;
  amount?: number;
  nameOnAccount?: string;
  expirationDate?: Date;
  enableBillingInformation?: boolean;
  billingAddress?: Address;
  email?: string;
  requireEmail?: boolean;
  enableSaveOption?: boolean;
}

/**
 * @class
 * Initializes a new instance of the CreditCardModel class.
 * @constructor
 * The model sent to the client in response to a GET request for a credit card.
 *
 * @member {number} [id] Gets or sets the identifier.
 * @member {string} [token] The payment token for the credit card.
 * @member {string} [cardHolderName] The name of the cardholder, as it appears
 * on the front of the credit card.
 * @member {string} [cardNumber] The obfuscated credit card number for the
 * credit card, such as xxxxxxxxxxxx1234
 * @member {number} [expirationMonth] The expiration month of the credit card.
 * @member {number} [expirationYear] The expiration year of the credit card.
 * @member {object} [billingAddress] The billing address for the credit card
 * holder.
 * @member {string} [billingAddress.address1] The first line of the street
 * address.  Typcically contains
 * the number and street name.
 * @member {string} [billingAddress.address2] The second line of the street
 * address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [billingAddress.city] The city where the address is
 * situated.
 * @member {string} [billingAddress.state] The state where the address is
 * located.
 * @member {string} [billingAddress.zipCode] The postal code for the address.
 * @member {string} [email] The email address for the credit card holder.
 * @member {string} [cardState] The state that the credit card is in. Possible
 * values include: 'Unknown', 'New', 'Authorized', 'Expired', 'Deleted',
 * 'Invalid'
 * @member {string} [cardType] Gets or sets the type of the card. Possible
 * values include: 'Unknown', 'Visa', 'MasterCard', 'Amex', 'Discover'
 * @member {string} [referenceId] The client application provided reference ID
 * for the credit card.
 * @member {date} [createdTime] The timestamp indicating when the credit card
 * was created.
 * @member {date} [modifiedTime] The timestamp indicating the last time that
 * the details of the credit card were modified.
 */
export interface CreditCardModel {
  id?: number;
  token?: string;
  cardHolderName?: string;
  cardNumber?: string;
  expirationMonth?: number;
  expirationYear?: number;
  billingAddress?: Address;
  email?: string;
  cardState?: string;
  cardType?: string;
  referenceId?: string;
  createdTime?: Date;
  modifiedTime?: Date;
}

/**
 * @class
 * Initializes a new instance of the CreditCardRequestModel class.
 * @constructor
 * The request model sent by the client for adding new credit cards to the
 * payment platform.
 *
 * @member {string} cardNumber The number on the credit card.
 * @member {string} securityCode The security, or CVV code, on the card.
 * @member {number} expirationMonth The expiration month of the credit card.
 * @member {number} expirationYear The expiration year of the credit card.
 * @member {string} cardHolderName The name of the cardholder, as it appears on
 * the front of the credit card.
 * @member {object} billingAddress The billing address for the credit card
 * holder..
 * @member {string} [billingAddress.address1] The first line of the street
 * address.  Typcically contains
 * the number and street name.
 * @member {string} [billingAddress.address2] The second line of the street
 * address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [billingAddress.city] The city where the address is
 * situated.
 * @member {string} [billingAddress.state] The state where the address is
 * located.
 * @member {string} [billingAddress.zipCode] The postal code for the address.
 * @member {string} email A valid email address for the card holder.
 * @member {string} [referenceId] The client application provided reference ID
 * for the credit card.
 * @member {string} [redirectUrl] The url that the client will be redirected to
 * after the credit card has been created.
 */
export interface CreditCardRequestModel {
  cardNumber: string;
  securityCode: string;
  expirationMonth: number;
  expirationYear: number;
  cardHolderName: string;
  billingAddress: Address;
  email: string;
  referenceId?: string;
  redirectUrl?: string;
}

/**
 * @class
 * Initializes a new instance of the CreditCardResponseModel class.
 * @constructor
 * The response model sent to the client when a new credit card is added to the
 * platform.
 *
 * @member {string} [token] The payment token for the credit card
 * @member {string} [cardState] The state that the credit card is in. Possible
 * values include: 'Unknown', 'New', 'Authorized', 'Expired', 'Deleted',
 * 'Invalid'
 * @member {string} [code] The pre-authorization result code.
 * @member {string} [message] The pre-authorization result message.
 * @member {string} [redirectUrl] The URL that the client will be redirected to
 * after the credit card has been created.
 */
export interface CreditCardResponseModel {
  token?: string;
  cardState?: string;
  code?: string;
  message?: string;
  redirectUrl?: string;
}

/**
 * @class
 * Initializes a new instance of the UpdateCreditCardModel class.
 * @constructor
 * The request model sent by the client for updating credit cards in the
 * payment platform.
 *
 * @member {string} token The payment token for the credit card.
 * @member {number} expirationMonth The expiration month of the credit card.
 * @member {number} expirationYear The expiration year of the credit card.
 * @member {string} cardHolderName The name of the cardholder, as it appears on
 * the front of the credit card.
 * @member {object} billingAddress The billing address for the credit card
 * holder..
 * @member {string} [billingAddress.address1] The first line of the street
 * address.  Typcically contains
 * the number and street name.
 * @member {string} [billingAddress.address2] The second line of the street
 * address.  Typically contains
 * an apartment number, suite number or department.
 * @member {string} [billingAddress.city] The city where the address is
 * situated.
 * @member {string} [billingAddress.state] The state where the address is
 * located.
 * @member {string} [billingAddress.zipCode] The postal code for the address.
 * @member {string} email A valid email address for the card holder.
 */
export interface UpdateCreditCardModel {
  token: string;
  expirationMonth: number;
  expirationYear: number;
  cardHolderName: string;
  billingAddress: Address;
  email: string;
}

/**
 * @class
 * Initializes a new instance of the PaymentMethodModel class.
 * @constructor
 * Defines a a funding source for a payment request.
 *
 * @member {string} paymentToken The credit card or bank account token that
 * will be used for payment.
 * @member {string} type The type of funding source that will be used for the
 * payment. Possible values include: 'Unknown', 'Credit Card', 'ACH'
 */
export interface PaymentMethodModel {
  paymentToken: string;
  type: string;
}

/**
 * @class
 * Initializes a new instance of the PaymentResultModel class.
 * @constructor
 * The model sent to the client as a part of the payment model.
 * Provides details on the payment result.
 *
 * @member {string} [status] The current status of the payment. Possible values
 * include: 'Unknown', 'New', 'Authorized', 'Captured', 'Expired', 'Declined',
 * 'Failed', 'Cancelled', 'Charge Back', 'Refunded', 'Partially Refunded'
 * @member {string} [code] The payment result code.
 * @member {string} [message] The payment result message.
 * @member {string} [providerAccountId] The unique ID of the provider account
 * that was used to make this payment.
 * @member {string} [merchantTransactionId] Tthe merchant transaction
 * identifier.
 * @member {number} [merchantTransactionFee] The merchant transaction fee.
 */
export interface PaymentResultModel {
  status?: string;
  code?: string;
  message?: string;
  providerAccountId?: string;
  merchantTransactionId?: string;
  merchantTransactionFee?: number;
}

/**
 * @class
 * Initializes a new instance of the RefundResultModel class.
 * @constructor
 * The model sent to the client as a part of the payment model.
 * Provides details on the refund result.
 *
 * @member {string} [status] The current status of the refund. Possible values
 * include: 'Unknown', 'New', 'Authorized', 'Captured', 'Expired', 'Declined',
 * 'Failed', 'Cancelled', 'Charge Back', 'Refunded', 'Partially Refunded'
 * @member {string} [code] The refund result code.
 * @member {string} [message] The refund result message.
 * @member {string} [merchantTransactionId] The Merchant Transaction ID number
 * for the payment that is being refunded.
 * @member {string} [providerAccountId] The unique ID of the provider account
 * that was used to make this refund.
 * @member {number} [amount] The amount to be refunded.  If an amount less than
 * the original payment amount is
 * specified, a partial refund will be processed.  If no amount is specified, a
 * full refund
 * will be processed.
 * @member {string} [reason] The reason for issuing the refund.
 * @member {date} [createdDate] The timestamp indicating when the refund was
 * created.
 */
export interface RefundResultModel {
  status?: string;
  code?: string;
  message?: string;
  merchantTransactionId?: string;
  providerAccountId?: string;
  amount?: number;
  reason?: string;
  createdDate?: Date;
}

/**
 * @class
 * Initializes a new instance of the PaymentModel class.
 * @constructor
 * The model sent to the client requests the details of a payment, or adds a
 * new payment
 * to the platform.
 *
 * @member {number} [id] The unique ID of the payment.
 * @member {number} [accountId] The unique ID of the account that the payment
 * was made for.
 * @member {number} [paymentAmount] The payment amount.
 * @member {string} [description] The description of what was paid for.
 * @member {string} [referenceId] The client application provided reference ID
 * for the payment.
 * @member {object} [paymentMethod] The method of payment.
 * @member {string} [paymentMethod.paymentToken] The credit card or bank
 * account token that will be used for payment.
 * @member {string} [paymentMethod.type] The type of funding source that will
 * be used for the payment. Possible values include: 'Unknown', 'Credit Card',
 * 'ACH'
 * @member {object} [result] The result of the payment request.
 * @member {string} [result.status] The current status of the payment. Possible
 * values include: 'Unknown', 'New', 'Authorized', 'Captured', 'Expired',
 * 'Declined', 'Failed', 'Cancelled', 'Charge Back', 'Refunded', 'Partially
 * Refunded'
 * @member {string} [result.code] The payment result code.
 * @member {string} [result.message] The payment result message.
 * @member {string} [result.providerAccountId] The unique ID of the provider
 * account that was used to make this payment.
 * @member {string} [result.merchantTransactionId] Tthe merchant transaction
 * identifier.
 * @member {number} [result.merchantTransactionFee] The merchant transaction
 * fee.
 * @member {array} [refunds] Gets or sets the refund result.
 * @member {date} [createdDate] The timestamp indicating when the payment was
 * created.
 * @member {date} [modifiedDate] The timestamp indicating the last time that
 * the details of the payment were modified.
 */
export interface PaymentModel {
  id?: number;
  accountId?: number;
  paymentAmount?: number;
  description?: string;
  referenceId?: string;
  paymentMethod?: PaymentMethodModel;
  result?: PaymentResultModel;
  refunds?: RefundResultModel[];
  createdDate?: Date;
  modifiedDate?: Date;
}

/**
 * @class
 * Initializes a new instance of the PaymentFilter class.
 * @constructor
 * Defines a payment filter when requesting a collection of payments
 *
 * @member {string} referenceId The client application provided reference ID
 * for the payment.
 * @member {date} [minDate] The optional lower bound of the range for payment
 * date.
 * @member {date} [maxDate] The optional upper bound of the range for payment
 * date.
 */
export interface PaymentFilter {
  referenceId: string;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * @class
 * Initializes a new instance of the PaymentRequestModel class.
 * @constructor
 * The request model sent by the client to add a new payment to the platform.
 *
 * @member {number} [paymentAmount] The payment amount.
 * @member {string} [description] The description of what will be paid for.
 * @member {string} [referenceId] The client application provided reference ID
 * for the payment.
 * @member {object} paymentMethod The method of payment.
 * @member {string} [paymentMethod.paymentToken] The credit card or bank
 * account token that will be used for payment.
 * @member {string} [paymentMethod.type] The type of funding source that will
 * be used for the payment. Possible values include: 'Unknown', 'Credit Card',
 * 'ACH'
 * @member {string} [callbackUrl] The callback URL where payment notifications
 * will be sent.  Payment notifications are sent when the
 * state of a payment changes.  Notifications will be sent as an HTTP POST to
 * the URL provided and will
 * contain a PaymentId and optional ReferenceId, if one was provided when the
 * payment was created.
 */
export interface PaymentRequestModel {
  paymentAmount?: number;
  description?: string;
  referenceId?: string;
  paymentMethod: PaymentMethodModel;
  callbackUrl?: string;
}

/**
 * @class
 * Initializes a new instance of the RefundRequestModel class.
 * @constructor
 * The request model sent by the client to add a new refund to the platform.
 *
 * @member {number} [amount] The amount to be refunded.  If an amount less than
 * the original payment amount is
 * specified, a partial refund will be processed.  If no amount is specified, a
 * full refund
 * will be processed.
 * @member {string} reason The reason for issuing the refund.
 */
export interface RefundRequestModel {
  amount?: number;
  reason: string;
}

/**
 * @class
 * Initializes a new instance of the SubscriptionModel class.
 * @constructor
 * The model sent to the client in response to a GET request for a payment
 * subscription.
 *
 * @member {number} [id] The id of the payment subscription.
 * @member {string} [name] The name of payment subscription.
 * @member {string} [description] The description of payment subscription.
 * @member {object} [properties] The properties of the payment subscription.
 * @member {number} [runDay] The process day of the payment subscription.
 * @member {string} [state] The state that payment subscription is in. Possible
 * values include: 'Active', 'Inactive', 'Expired'
 * @member {string} [paymentType] The payment type of the payment subscription.
 * Possible values include: 'Unknown', 'Credit Card', 'ACH'
 * @member {string} [paymentToken] The payment token of the payment
 * subscription.
 * @member {string} [amountType] The amount type of the payment subscription.
 * Possible values include: 'Fixed', 'Dynamic'
 * @member {number} [amount] The amount of money to be charged by the payment
 * subscription.
 * @member {string} [amountWebServiceURL] The url of web api to use to retrieve
 * the amount to be charged by the payment subscription.
 * @member {string} [callbackWebServiceURL] The url of a web api to use to post
 * back notifications each time payment subscription is processed.
 * @member {string} [referenceId] The client application provided reference ID
 * for the credit card.
 * @member {date} [lastProcessed] The timestamp indicating when the
 * subscription was last processed.
 * @member {date} [endDate] The date indicating when the payment subscription
 * should be stopped.
 * @member {date} [createdTime] The timestamp indicating when the credit card
 * was created.
 * @member {date} [modifiedTime] The timestamp indicating the last time that
 * the details of the credit card were modified.
 */
export interface SubscriptionModel {
  id?: number;
  name?: string;
  description?: string;
  properties?: { [propertyName: string]: string };
  runDay?: number;
  state?: string;
  paymentType?: string;
  paymentToken?: string;
  amountType?: string;
  amount?: number;
  amountWebServiceURL?: string;
  callbackWebServiceURL?: string;
  referenceId?: string;
  lastProcessed?: Date;
  endDate?: Date;
  createdTime?: Date;
  modifiedTime?: Date;
}

/**
 * @class
 * Initializes a new instance of the SubscriptionRequestModel class.
 * @constructor
 * The request model sent by the client for adding new subscription to the
 * payment platform.
 *
 * @member {string} name The name of payment subscription.
 * @member {string} [description] The description of payment subscription.
 * @member {object} [properties] The properties of the payment subscription.
 * @member {number} runDay The process day of the payment subscription.
 * @member {string} state The state that payment subscription is in. Possible
 * values include: 'Active', 'Inactive', 'Expired'
 * @member {string} paymentType The payment type of the payment subscription.
 * Possible values include: 'Unknown', 'Credit Card', 'ACH'
 * @member {string} paymentToken The payment token of the payment subscription.
 * @member {string} amountType The amount type of the payment subscription.
 * Possible values include: 'Fixed', 'Dynamic'
 * @member {number} [amount] The amount of money to be charged by the payment
 * subscription.
 * @member {string} [amountWebServiceURL] The url of web api to use to retrieve
 * the amount to be charged by the payment subscription.
 * @member {string} [callbackWebServiceURL] The url of a web api to use to post
 * back notifications each time payment subscription is processed.
 * @member {date} [endDate] The date indicating when the payment subscription
 * should be stopped.
 * @member {string} [referenceId] The client application provided reference ID
 * for the credit card.
 */
export interface SubscriptionRequestModel {
  name: string;
  description?: string;
  properties?: { [propertyName: string]: string };
  runDay: number;
  state: string;
  paymentType: string;
  paymentToken: string;
  amountType: string;
  amount?: number;
  amountWebServiceURL?: string;
  callbackWebServiceURL?: string;
  endDate?: Date;
  referenceId?: string;
}

/**
 * @class
 * Initializes a new instance of the SubscriptionResponceModel class.
 * @constructor
 * The response model that is returned to the client when a new payment
 * subscription is added to the platform.
 *
 * @member {string} [referenceId] Gets or sets the reference id.
 * @member {string} [state] Gets or sets the subscription state. Possible
 * values include: 'Active', 'Inactive', 'Expired'
 */
export interface SubscriptionResponceModel {
  referenceId?: string;
  state?: string;
}

/**
 * @class
 * Initializes a new instance of the UpdateSubscriptionModel class.
 * @constructor
 * The request model sent by the client for updating subscription in the
 * payment platform.
 *
 * @member {number} id The id of the payment subscription.
 * @member {string} name The name of payment subscription.
 * @member {string} [description] The description of payment subscription.
 * @member {object} [properties] The properties of the payment subscription.
 * @member {number} runDay The process day of the payment subscription.
 * @member {string} state The state that payment subscription is in. Possible
 * values include: 'Active', 'Inactive', 'Expired'
 * @member {string} paymentType The payment type of the payment subscription.
 * Possible values include: 'Unknown', 'Credit Card', 'ACH'
 * @member {string} paymentToken The payment token of the payment subscription.
 * @member {string} amountType The amount type of the payment subscription.
 * Possible values include: 'Fixed', 'Dynamic'
 * @member {number} [amount] The amount of money to be charged by the payment
 * subscription.
 * @member {string} [amountWebServiceURL] The url of web api to use to retrieve
 * the amount to be charged by the payment subscription.
 * @member {string} [callbackWebServiceURL] The url of a web api to use to post
 * back notifications each time payment subscription is processed.
 * @member {date} [endDate] The date indicating when the payment subscription
 * should be stopped.
 * @member {string} [referenceId] The client application provided reference ID
 * for the credit card.
 */
export interface UpdateSubscriptionModel {
  id: number;
  name: string;
  description?: string;
  properties?: { [propertyName: string]: string };
  runDay: number;
  state: string;
  paymentType: string;
  paymentToken: string;
  amountType: string;
  amount?: number;
  amountWebServiceURL?: string;
  callbackWebServiceURL?: string;
  endDate?: Date;
  referenceId?: string;
}

/**
 * @class
 * Initializes a new instance of the WalletModel class.
 * @constructor
 * Wallet Model
 *
 * @member {number} id Gets or sets the identifier.
 * @member {string} [defaultToken] Gets or sets the default token.
 * @member {array} [creditCards] Gets or sets the credit cards.
 * @member {array} [bankAccounts] Gets or sets the bank accounts.
 */
export interface WalletModel {
  id: number;
  defaultToken?: string;
  creditCards?: CreditCardModel[];
  bankAccounts?: BankAccountModel[];
}

/**
 * @class
 * Initializes a new instance of the WalletRequestModel class.
 * @constructor
 * Wallet Request Model
 *
 * @member {string} [referenceId] Gets or sets the reference identifier.
 */
export interface WalletRequestModel {
  referenceId?: string;
}

/**
 * @class
 * Initializes a new instance of the WalletCreditCardRequestModel class.
 * @constructor
 * Wallet credit card request model
 *
 * @member {string} [paymentToken] Gets or sets the payment token.
 * @member {boolean} [isDefault] Gets or sets a value indicating whether this
 * instance is default.
 */
export interface WalletCreditCardRequestModel {
  paymentToken?: string;
  isDefault?: boolean;
}

/**
 * @class
 * Initializes a new instance of the WalletBankAccountRequestModel class.
 * @constructor
 * Wallet Bank Account Request Model
 *
 * @member {string} [paymentToken] Gets or sets the payment token.
 * @member {boolean} [isDefault] Gets or sets a value indicating whether this
 * instance is default.
 */
export interface WalletBankAccountRequestModel {
  paymentToken?: string;
  isDefault?: boolean;
}
