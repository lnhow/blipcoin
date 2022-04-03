const Blockchain = require('../../types/blockchain');
const Wallet = require('../../types/wallet');
const Transaction = require('../../types/transaction');
const { getErrResponse } = require('../../helpers/error');
const miner = require('../../config').miner;

/**
 * Create a controller to operate on the DI-ed blockchain
 * @param {Blockchain} blockchain The blockchain to operate on
 */
const WalletController = (blockchain) => ({
  handleCreateWallet(req, res) {
    const newWallet = Wallet.createWallet();
    res.status(201).json({
      success: true,
      data: {
        address: newWallet.getAddress(),
        privateKey: newWallet.getPrivate(),
      },
      message: 'Create wallet successfully'
    });
  },

  handleCreateTransaction(req, res) {
    const { privateKey, fromAddress, toAddress, amount } = req.body;
    const errRes = getErrResponse();
    if (!privateKey || !fromAddress || !toAddress || !amount) {
      errRes.message = 'Invalid or missing argument';
      return res.status(400).json(errRes);
    }

    try {
      const wallet = Wallet.getFromPrivate(params.private);
      const transaction = new Transaction(fromAddress, toAddress, amount);
      wallet.signTransaction(transaction);
      blockchain.addTransaction(transaction);
      res.status(201).json({
        success: true,
        data: {
          transaction: blockchain.getTransaction(transaction.id),
        },
        message: 'Create transaction successfully'
      })
    } catch (err) {
      errRes.message = err.message;
      return res.status(400).json(errRes);
    }
  },

  handleGetWalletInfo(req, res) {
    const address = req.params.address;
    const balance = blockchain.getWalletBalance(address);
    const transactions = blockchain.getWalletTransaction(address);
    res.status(200).json({
      success: true,
      data: {
        address: address,
        balance: balance,
        transactions: transactions,
      }
    })
  },
});

module.exports = WalletController;