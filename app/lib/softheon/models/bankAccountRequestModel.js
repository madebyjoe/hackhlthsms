/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * The request model sent by the client for adding new bank accounts to the
 * payment platform.
 *
 */
class BankAccountRequestModel {
  /**
   * Create a BankAccountRequestModel.
   * @member {string} accountNumber The bank account number.
   * @member {string} routingNumber The routing number of the bank where the
   * bank account was opened.
   * @member {string} accountHolderName The name of the individual or entity
   * that is autorized to make transactions for the bank account.
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
   * @member {string} [accountHolderAddress.state] The state where the address
   * is located.
   * @member {string} [accountHolderAddress.zipCode] The postal code for the
   * address.
   * @member {string} type The bank account type. Possible values include:
   * 'Unknown', 'Checking', 'Savings'
   * @member {string} [referenceId] The client application provided reference
   * ID for the bank account.
   * @member {string} [nickname] The aribtrary nickname of the account, used as
   * a way to identify the account.
   * @member {string} email The email address for the account holder.
   * @member {string} [redirectUrl] The url that the client will be redirected
   * to after the bank account has been created.
   */
  constructor() {
  }

  /**
   * Defines the metadata of BankAccountRequestModel
   *
   * @returns {object} metadata of BankAccountRequestModel
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'BankAccountRequestModel',
      type: {
        name: 'Composite',
        className: 'BankAccountRequestModel',
        modelProperties: {
          accountNumber: {
            required: true,
            serializedName: 'accountNumber',
            constraints: {
              Pattern: '\d{4,17}$'
            },
            type: {
              name: 'String'
            }
          },
          routingNumber: {
            required: true,
            serializedName: 'routingNumber',
            constraints: {
              Pattern: '\d{9,9}$'
            },
            type: {
              name: 'String'
            }
          },
          accountHolderName: {
            required: true,
            serializedName: 'accountHolderName',
            type: {
              name: 'String'
            }
          },
          accountHolderAddress: {
            required: true,
            serializedName: 'accountHolderAddress',
            type: {
              name: 'Composite',
              className: 'Address'
            }
          },
          type: {
            required: true,
            serializedName: 'type',
            type: {
              name: 'String'
            }
          },
          referenceId: {
            required: false,
            serializedName: 'referenceId',
            type: {
              name: 'String'
            }
          },
          nickname: {
            required: false,
            serializedName: 'nickname',
            type: {
              name: 'String'
            }
          },
          email: {
            required: true,
            serializedName: 'email',
            type: {
              name: 'String'
            }
          },
          redirectUrl: {
            required: false,
            serializedName: 'redirectUrl',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = BankAccountRequestModel;