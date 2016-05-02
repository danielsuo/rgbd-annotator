#ifndef POINTCLOUD_H
#define POINTCLOUD_H

#include <vector>
#include <iostream>
#include <fstream>
#include "float.h"
#include <GL/osmesa.h>
#include <GL/glu.h>
#include "opencv2/imgcodecs.hpp"
#include "opencv2/imgproc/imgproc.hpp"

using namespace std;

struct Camera {
  float cx, cy, fx, fy;
  Camera(float cx, float cy, float fx, float fy) : cx(cx), cy(cy), fx(fx), fy(fy) {};
};

class PointCloud {
public:
  cv::Mat color;
  cv::Mat depth;

  static Camera *camera;

  PointCloud();
  PointCloud(vector<char> *color_buffer, vector<char> *depth_buffer);
  PointCloud(string color_path, string depth_path);
  ~PointCloud();

  void linearizeDepth();
  void projectPointCloud();
  void scalePointCloud(float factor);
  void transformPointCloud(float T[12]);
  void getExtents(float &minx, float &maxx, float &miny, float &maxy, float &minz, float &maxz);
  void writePLY(string path);
  void append(PointCloud *other);
  void copy(PointCloud *other);

  static void writePLY(string path, cv::Mat ply);
  static cv::Mat readPLY(string path);

  void bitShiftDepth();
  void createPointCloud();
};

#endif