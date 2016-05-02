# rgbd-annotater
Name says it all.

## Overview
- Process CAD models into PLY
- Process PNG into PLY into octree data
- Deploy application on webserver
- Set up python script

## Installation instructions
Right now, just works on Ubuntu. Tested on 15.04 and 15.10. Should be easy to run on OS X as well, but the install script assumes Ubuntu.

```bash
./scripts/install
```

## Running
```bash
npm start

# navigate to http://localhost:8080
```

## Publishing to GitHub Pages
```bash
./scripts/publish "Commit message"
```

## TODO

### High priority
- Load depth / color data as point cloud
- URL routing
- Export to python script
- Reproject model on color image

### Medium priority
- Start camera at camera position where depth was taken
- Turn off mouse gesture if go out of domElement
- Bring back measurement tools

### Low priority
- Handle on mobile (touch input)

### Future
- [Example](http://vision.princeton.edu/projects/2015/VideoNet/internal/stable/label3d_pascal.mp4)

## Etc

http://vision.princeton.edu/data/
/n/fs/vwd/editors/apc/
http://vision.princeton.edu/data/editors/apc/

This one serves as an example:
/n/fs/vwd/editors/polygon

We have a python script there for saving: save.cgi

http://vision.princeton.edu/data/editors/polygon/?image=dataset/shared/SUNRGBD/realsense/sa/2014_10_21-15_21_11-1311000073/