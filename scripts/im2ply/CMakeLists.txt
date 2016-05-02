cmake_minimum_required (VERSION 3.1)
project (im2ply CXX)

set (CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} ${CMAKE_CURRENT_SOURCE_DIR}/cmake)

# Add OpenCV dependency
if (APPLE)
  # Assume we've installed OpenCV via brew
  set ("OpenCV_DIR" "/usr/local/Cellar/opencv3/3.1.0_1/share/OpenCV")
endif ()
find_package (OpenCV REQUIRED)

# Add OSMesa
find_package (OSMesa REQUIRED)
include_directories (${OSMESA_INCLUDE_DIR})

include_directories (${CMAKE_CURRENT_SOURCE_DIR})

set (sources
  im2ply.cpp
  PointCloud.cpp)

add_executable (im2ply ${sources})
target_link_libraries (im2ply ${OpenCV_LIBS})
target_link_libraries (im2ply ${OSMESA_LIBRARY})


set_property (TARGET im2ply PROPERTY CXX_STANDARD 11)
set_property (TARGET im2ply PROPERTY CXX_STANDARD_REQUIRED ON)
