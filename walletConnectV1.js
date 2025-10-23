<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>

<!-- Web3Modal v1 + WalletConnect v1 -->
<script src="https://unpkg.com/web3modal@1.9.12/dist/index.js"></script>
<script src="https://unpkg.com/@walletconnect/web3-provider@1.8.0/dist/umd/index.min.js"></script>

<script>
(async () => {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        infuraId: "YOUR_INFURA_ID" // or RPCs
      }
    }
  };

  const web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions
  });

  const connectBtn = document.getElementById("connect");
  let provider, ethersProvider;

  connectBtn.addEventListener("click", async () => {
    try {
      provider = await web3Modal.connect();
      ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      connectBtn.textContent = address.slice(0, 6) + "..." + address.slice(-4);
    } catch (err) {
      console.error(err);
    }
  });
})();
</script>
