import { createContext, useState, useEffect } from "react";
import useMADExchangeContract from "../hooks/useMADExchangeContract";
import { ethers } from "ethers";

const MadExContext = createContext({
  madBalance: 0,
  mutantSaleOpen: false,
});

export function MadExContextProvider({ children }) {
  const [madBalance, setMadBalance] = useState(0);
  const [mutantSaleOpen, setMutantSaleOpen] = useState(false);
  const madExchangeContract = useMADExchangeContract();

  useEffect(() => {
    console.log("madex context");
    
    if (!madExchangeContract) return;

    let mounted = true;

    const getMutants = async () => {
      try {
        const isOpen = await madExchangeContract.mutantSalesStatus();
        setMutantSaleOpen(isOpen);
        
        const balance = await madExchangeContract.checkMADbalance();
        setMadBalance(Math.round(+ethers.utils.formatEther(balance)*100)/100);
  
      } catch (err) {
        console.log("error getting max ex data", err);
        
      }
    };

    if (mounted) {
      getMutants();
    }

  },[madExchangeContract])

  return (
    <MadExContext.Provider value={{ madBalance: madBalance, mutantSaleOpen: mutantSaleOpen }}>
      {children}
    </MadExContext.Provider>
  );
}

export default MadExContext;

