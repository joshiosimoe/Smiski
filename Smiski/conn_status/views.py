from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from web3 import Web3

# Connect to Ethereum using Infura
INFURA_URL = "https://mainnet.infura.io/v3/be1314966eca4b9b894eb80d6d42f909"  # Replace with your Infura API Key
w3 = Web3(Web3.HTTPProvider(INFURA_URL))

def home(request):
    status = "Connected" if w3.is_connected() else "Not Connected"
    latest_block = w3.eth.block_number if w3.is_connected() else "N/A"

    return render(request, "conn_status.html", {"status": status, "latest_block": latest_block})
