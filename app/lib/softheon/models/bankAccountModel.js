/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * The model sent to the client in response to a GET request for a bank
 * account.
 *
 */
class BankAccountModel {
  /**
   * Create a BankAccountModel.
   * @member {number} [id] Gets or sets the identifier.
   * @member {string} [token] The payment token for the bank account.
   * @member {string} [accountNumber] The bank account number.
   * @member {string} routingNumber The routing number of the bank where the
   * bank account was opened.
   * @member {string} type The bank account type. Possible values include:
   * 'Unknown', 'Checking', 'Savings'
   * @member {string} state The state that the bank acocunt is in. Possible
   * values include: 'Unknown', 'New', 'Pending', 'Authorized', 'Disabled'
   * @member {string} [nickname] The aribtrary nickname of the account, used as
   * a way to identify the account.
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
   * @member {string} email The email address for the account holder.
   * @member {string} [referenceId] The client application provided reference
   * ID for the bank account.
   * @member {date} [createdTime] The timestamp indicating when the bank
   * account was created.
   * @member {date} [modifiedTime] The timestamp indicating the last time that
   * the details of the bank account were modified.
   */
  constructor() {
  }

  /**
   * Defines the metadata of BankAccountModel
   *
   * @returns {object} metadata of BankAccountModel
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'BankAccountModel',
      type: {
        name: 'Composite',
        className: 'BankAccountModel',
        modelProperties: {
          id: {
            required: false,
            serializedName: 'id',
            type: {
              name: 'Number'
            }
          },
          token: {
            required: false,
            serializedName: 'token',
            type: {
              name: 'String'
            }
          },
          accountNumber: {
            required: false,
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
          type: {
            required: true,
            serializedName: 'type',
            type: {
              name: 'String'
            }
          },
          state: {
            required: true,
            serializedName: 'state',
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
          email: {
            required: true,
            serializedName: 'email',
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
          createdTime: {
            required: false,
            serializedName: 'createdTime',
            type: {
              name: 'DateTime'
            }
          },
          modifiedTime: {
            required: false,
            serializedName: 'modifiedTime',
            type: {
              name: 'DateTime'
            }
          }
        }
      }
    };
  }
}

module.exports = BankAccountModel;
