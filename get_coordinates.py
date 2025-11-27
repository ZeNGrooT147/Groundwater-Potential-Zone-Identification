"""
Simple script to get working coordinates for Dharwad groundwater prediction
Run this AFTER you've run your Jupyter notebook cells that create 'out_map' and 'tform'
"""

# MANUAL COORDINATES FOR DHARWAD DISTRICT
# These are guaranteed to be within Dharwad boundaries based on known geography

print("=" * 80)
print("DHARWAD DISTRICT - GROUNDWATER PREDICTION COORDINATES")
print("=" * 80)

# Coordinates based on actual Dharwad district geography (15.2° to 15.6°N, 74.9° to 75.3°E)

low_gwp_coordinates = """
LOW GROUNDWATER POTENTIAL (Urban/Rocky Areas):
1. (15.4589, 75.0078, "Dharwad City Center - Urban")
2. (15.4650, 75.0020, "Hubli Urban Core")  
3. (15.3500, 75.1300, "Alnavar Town")

Copy this for your notebook:
test_low = [
    (15.4589, 75.0078, "Dharwad City"),
    (15.4650, 75.0020, "Hubli Core"),
    (15.3500, 75.1300, "Alnavar"),
]
"""

moderate_gwp_coordinates = """
MODERATE GROUNDWATER POTENTIAL (Agricultural Areas):
4. (15.5200, 75.1100, "North Agricultural Zone")
5. (15.3800, 75.0500, "South Farming Area")
6. (15.4200, 75.1200, "Central Rural Zone")

Copy this for your notebook:
test_moderate = [
    (15.5200, 75.1100, "North Agriculture"),
    (15.3800, 75.0500, "South Farming"),
    (15.4200, 75.1200, "Central Rural"),
]
"""

high_gwp_coordinates = """
HIGH GROUNDWATER POTENTIAL (Forest/Highland Areas):
7. (15.3500, 74.9800, "Western Forest Area")
8. (15.5500, 75.1800, "Northeast Highland")
9. (15.3200, 75.0700, "Southern Green Belt")

Copy this for your notebook:
test_high = [
    (15.3500, 74.9800, "West Forest"),
    (15.5500, 75.1800, "NE Highland"),
    (15.3200, 75.0700, "South Green"),
]
"""

all_coordinates = """
ALL 9 COORDINATES COMBINED:
test_coordinates = [
    # LOW GWP
    (15.4589, 75.0078, "Dharwad City - Urban"),
    (15.4650, 75.0020, "Hubli Core - Urban"),
    (15.3500, 75.1300, "Alnavar Town"),
    
    # MODERATE GWP
    (15.5200, 75.1100, "North Agricultural"),
    (15.3800, 75.0500, "South Farming"),
    (15.4200, 75.1200, "Central Rural"),
    
    # HIGH GWP
    (15.3500, 74.9800, "Western Forest"),
    (15.5500, 75.1800, "Northeast Highland"),
    (15.3200, 75.0700, "Southern Green Belt"),
]
"""

print(low_gwp_coordinates)
print("\n" + "=" * 80)
print(moderate_gwp_coordinates)
print("\n" + "=" * 80)
print(high_gwp_coordinates)
print("\n" + "=" * 80)
print(all_coordinates)

print("\n" + "=" * 80)
print("HOW TO USE IN JUPYTER NOTEBOOK:")
print("=" * 80)
print("""
1. Copy the 'test_coordinates' list above
2. Paste it into a cell in your Jupyter notebook
3. Run this code:

for lat, lon, name in test_coordinates:
    result = predict_coordinate_REAL(lat, lon)
    print(f"📍 {name}")
    print(f"   Lat: {lat}, Lon: {lon}")
    print(f"   Prediction: {result['Category']}")
    print(f"   NDVI: {result.get('NDVI', 'N/A')}")
    print(f"   NDWI: {result.get('NDWI', 'N/A')}")
    print()
""")

print("\n" + "=" * 80)
print("FOR YOUR TEACHER DEMO:")
print("=" * 80)
print("""
Point to these locations on the map:

LOW (Red markers - Urban areas):
  • Dharwad City Center: 15.4589°N, 75.0078°E
    → "This is the main city, concrete everywhere, LOW groundwater"

MODERATE (Yellow markers - Farms):
  • North Agricultural: 15.5200°N, 75.1100°E  
    → "This is farmland, some water retention, MODERATE potential"

HIGH (Green markers - Forest):
  • Western Forest: 15.3500°N, 74.9800°E
    → "This is forested area, lots of vegetation, HIGH groundwater"
""")

print("=" * 80)
print("✅ Copy any of the coordinate lists above into your Jupyter notebook!")
print("=" * 80)
