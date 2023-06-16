import React from "react";
import { useWeb3Context } from "../context";

interface ConnectProps {
  connect: (() => Promise<void> | null );
}

const ConnectButton = ({connect}: ConnectProps) => {
  return connect ? (
    <button 
      className="inline-block rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-600 focus:border-neutral-200 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" 
      onClick={connect}
      type="button"
    >Connect</button>
  ) : (
    <button>Loading...</button>
  )
}

const shortAddress = (address: string) => {
  return address.substring(0,4) + "..." + address.substring(address.length-3);
}

interface DisconnectProps {
  disconnect: (() => Promise<void> | null );
  address: string | null; 
}

const DisconnectButton = ({disconnect, address}: DisconnectProps) => {
  return disconnect ? (
    <button 
      className="inline-block rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" 
      onClick={disconnect}
      type="button"
    >{shortAddress(address)}</button>
  ) : (
    <button>Loading...</button>
  )
}

export function Web3Button() {
  const { web3Provider, connect, disconnect, address} = useWeb3Context();
  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} address={address} /> 
  ) : (
    <ConnectButton connect={connect} />
  )
}