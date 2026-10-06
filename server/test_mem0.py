import os
from dotenv import load_dotenv
from mem0 import MemoryClient

load_dotenv()

api_key = os.getenv("MEM0_API_KEY")

print("API key loaded:", bool(api_key))

client = MemoryClient(api_key=api_key)

result = client.add(
    "I am building a project called CheerLoop for a buildathon.",
    user_id="test-user"
)

print("Mem0 response:")
print(result)