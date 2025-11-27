# DEBUG: Check why predictions are empty
# Run this in your notebook to diagnose the issue

import numpy as np
from shapely.geometry import Point

print("=" * 70)
print("DIAGNOSTIC CHECK - Finding Valid Coordinates")
print("=" * 70)

# 1. Check Dharwad boundary
print("\n1. Dharwad Boundary Information:")
print(f"   CRS: {dh.crs}")
print(f"   Bounds: {dh.total_bounds}")
print(f"   Geometry type: {dh.geometry.iloc[0].geom_type}")

# 2. Check transform information
print("\n2. Raster Transform Information:")
print(f"   Transform: {tform}")
print(f"   Map shape: {out_map.shape}")

# 3. Get actual lat/lon bounds from the map
from pyproj import Transformer
transformer = Transformer.from_crs(src8.crs, "EPSG:4326", always_xy=True)

# Get corners of the actual raster
left, bottom, right, top = src8.bounds
lon_min, lat_min = transformer.transform(left, bottom)
lon_max, lat_max = transformer.transform(right, top)

print("\n3. Actual Valid Coordinate Range:")
print(f"   Latitude:  {lat_min:.4f}° to {lat_max:.4f}°")
print(f"   Longitude: {lon_min:.4f}° to {lon_max:.4f}°")

# 4. Sample some VALID coordinates from the actual map
print("\n4. Generating VALID coordinates from actual data:")
print("   Sampling random points from the prediction map...")

valid_coords = []
categories = {0: "Low", 1: "Moderate", 2: "High"}
samples_per_category = 3

for category in [0, 1, 2]:
    # Find pixels with this category
    indices = np.argwhere(out_map == category)
    
    if len(indices) > 0:
        # Sample random pixels
        n_samples = min(samples_per_category, len(indices))
        sample_indices = np.random.choice(len(indices), n_samples, replace=False)
        
        for idx in sample_indices:
            r, c = indices[idx]
            
            # Convert pixel to coordinates
            x = tform[2] + c * tform[0]
            y = tform[5] + r * tform[4]
            
            # Transform to lat/lon
            lon, lat = transformer.transform(x, y)
            
            valid_coords.append({
                'lat': lat,
                'lon': lon,
                'category': categories[category],
                'pixel_row': r,
                'pixel_col': c
            })
            
            print(f"   ✓ {categories[category]:8s} | Lat: {lat:.4f}, Lon: {lon:.4f}")

# 5. Create ready-to-use coordinate list
print("\n" + "=" * 70)
print("READY-TO-USE COORDINATES (Copy these to your test!):")
print("=" * 70)

print("\ntest_coordinates = [")
for coord in valid_coords:
    print(f"    ({coord['lat']:.4f}, {coord['lon']:.4f}, \"{coord['category']} GWP Area\"),")
print("]")

# 6. Test one coordinate
if valid_coords:
    print("\n" + "=" * 70)
    print("TESTING ONE COORDINATE:")
    print("=" * 70)
    test_coord = valid_coords[0]
    result = predict_coordinate_REAL(test_coord['lat'], test_coord['lon'])
    print(f"\nTest Location: {test_coord['lat']:.4f}°N, {test_coord['lon']:.4f}°E")
    print(f"Expected: {test_coord['category']}")
    print(f"Result: {result}")
