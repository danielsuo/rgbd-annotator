#include <iostream>
#include <string>
#include "PointCloud.h"

using namespace std;

int main(int argc, char **argv) {
  string color = argv[1];
  string depth = argv[2];
  string out = argv[3];

  cout << color << " " << depth << " " << out << endl;
  PointCloud *pcl = new PointCloud(color, depth);
  pcl->writePLY(out);

  delete pcl;
}