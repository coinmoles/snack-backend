import requests
import cv2
import numpy as np
import sys
import json

def img_from_url(img_url):
    img_nparray = np.asarray(bytearray(requests.get(img_url).content), dtype=np.uint8)
    img = cv2.imdecode(img_nparray, cv2.IMREAD_COLOR)
   
    return img

def to_bin(img):
    img_grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, img_bin = cv2.threshold(img_grey, 240, 225, cv2.THRESH_BINARY)
    img_bin = ~img_bin

    return img_bin

def dilate_img(img_bin):
    kernal = np.ones((5, 5), np.uint8)

    return cv2.dilate(img_bin, kernal, iterations=1)

def find_line(img_bin):
    line_min_width = 15
    kernal_h = np.ones((1, line_min_width), np.uint8)
    kernal_v = np.ones((line_min_width, 1), np.uint8)

    img_bin_h = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_h)
    img_bin_v = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_v)

    img_bin_final = img_bin_h|img_bin_v

    return img_bin_final

def get_rectangle(lines):
    _, labels, stats, _ = cv2.connectedComponentsWithStats(~lines, connectivity=8, ltype=cv2.CV_32S)

    return stats


img_url = sys.argv[1]
# img_url = "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/242828923_422489069388745_426705476921744685_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=825194&_nc_ohc=_NaakK4gP0wAX8kXM7E&_nc_ht=scontent-ssn1-1.xx&oh=906de17973fde38eacaf8d423c8e9044&oe=61A0478B"
img = img_from_url(img_url)
img_bin = to_bin(img)
img_dilate = dilate_img(img_bin)
line = find_line(img_dilate)
rectangle = get_rectangle(line)

for (x, y, w, h, area) in rectangle[2:]:
    print(json.dumps({
        "left": int(x),
        "top": int(y),
        "width": int(w),
        "height": int(h)
    }))