# Quick Test Script for New Advanced Features
# Run this after starting the Flask backend (python app_hybrid.py)

import requests
import json

BASE_URL = "http://localhost:5000/api"

# Test coordinates (Dharwad center)
test_location = {
    "lat": 15.45,
    "lon": 75.0
}

def test_endpoint(name, endpoint, extra_params=None):
    """Test a single endpoint"""
    print(f"\n{'='*60}")
    print(f"Testing: {name}")
    print(f"Endpoint: {endpoint}")
    print(f"{'='*60}")
    
    payload = test_location.copy()
    if extra_params:
        payload.update(extra_params)
    
    try:
        response = requests.post(f"{BASE_URL}/{endpoint}", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ SUCCESS - Status: {response.status_code}")
            print(f"\nSample Response (first 500 chars):")
            print(json.dumps(data, indent=2)[:500] + "...")
        else:
            print(f"❌ FAILED - Status: {response.status_code}")
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")

# Run tests
print("\n" + "="*60)
print("TESTING 8 NEW ADVANCED FEATURES")
print("="*60)
print(f"Test Location: Dharwad Center (15.45°N, 75.0°E)")
print("="*60)

# 1. Community Atlas
test_endpoint(
    "Community Water Atlas",
    "community-atlas"
)

# 2. 3D Aquifer Visualization
test_endpoint(
    "3D Aquifer Visualization",
    "aquifer-3d"
)

# 3. Cost-Benefit Analysis
test_endpoint(
    "Cost-Benefit Analyzer",
    "cost-benefit",
    {"investment": 150000}
)

# 4. Nearby Water Sources
test_endpoint(
    "Nearby Water Sources Finder",
    "nearby-sources",
    {"radius": 5.0}
)

# 5. Satellite Time-Lapse
test_endpoint(
    "Satellite Time-Lapse (NDVI/NDWI)",
    "satellite-timelapse",
    {"months": 12}
)

# 6. Government Compliance
test_endpoint(
    "Government Compliance Checker",
    "compliance-check"
)

# 7. Alerts System
test_endpoint(
    "Alerts System Setup",
    "alerts-setup",
    {"email": "test@example.com", "phone": "+919876543210"}
)

# 8. Precipitation Forecasting
test_endpoint(
    "Precipitation Forecasting",
    "precipitation-forecast",
    {"days": 7}
)

print("\n" + "="*60)
print("ALL TESTS COMPLETED")
print("="*60)
print("\n✅ If all tests show SUCCESS, the backend is working correctly!")
print("❌ If any test failed, check the Flask server logs for details.")
print("\nNext: Test from the React frontend UI at http://localhost:3000/advanced")
print("="*60 + "\n")
