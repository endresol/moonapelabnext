import {useEffect, useReducer, useCallback} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { toast } from 'react-toastify'

import {
  Web3ProviderState,
  Web3Action, 
  web3InitalState, 
  web3Reducer
} from "../reducers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
}

let web3Modal : Web3Modal | null

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  })
}

type web3Client = Web3ProviderState & {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

export const useWeb3 = () => {
  const [state, dispatch ] = useReducer(web3Reducer, web3InitalState);
  const { provider, web3Provider, signer, address, network} = state;

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();        
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();        
        const address = await signer.getAddress();        
        const network = await web3Provider.getNetwork();
        toast.success("Connected to Web3");

        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider,
          web3Provider,
          signer,
          address, 
          network
        } as Web3Action)
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
      
    }
  },[])

  const disconnect = useCallback( async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      toast.error("Disconnected from Web3");

      dispatch({
        type: "RESET_WEB3_PROVIDER",
      } as Web3Action)
    } else {
      console.error("No Web3Modal");     
    }
  }, [provider])

   // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info("Address changed");
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        } as Web3Action)
      }

      const handleChainChange = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("Switch the chain...", _hexChainId);
          toast.info("Network changed");
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      }

      const handleDisconnect = (error: {code: number; message: string}) =>  {
        console.log("disconnect", error);
        disconnect();
      }

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChange);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChange);
          provider.removeListener("disconnect", handleDisconnect);
        }
      }
    }
  }, [provider, disconnect]);

  return {
    provider,
    web3Provider,
    signer,
    address,
    network,
    connect,
    disconnect
  } as web3Client
}