import { memo, useEffect } from 'react';

type ImagePreviewProps = {
  previewImg: string;
};

const ImagePreview = ({ previewImg }: ImagePreviewProps) => {
  useEffect(() => {
    let ignore = false;
    function imageZoom(imgID: any, resultID: any) {
      let img: any, lens: any, result: any, cx: any, cy: any;
      img = document.getElementById(imgID);
      // console.log("👌 ~ img", img.height);
      result = document.getElementById(resultID);
      /*create lens:*/
      lens = document.createElement('DIV');
      lens.setAttribute('class', 'img-zoom-lens');
      /*insert lens:*/
      img.parentElement.insertBefore(lens, img);
      /*calculate the ratio between result DIV and lens:*/
      cx = result.offsetWidth / lens.offsetWidth;
      cy = result.offsetHeight / lens.offsetHeight;
      /*set background properties for the result DIV:*/
      result.style.backgroundImage = "url('" + img.src + "')";
      result.style.backgroundSize = img.width * cx + 'px ' + img.height * cy + 'px';
      /*execute a function when someone moves the cursor over the image, or the lens:*/
      lens.addEventListener('mousemove', moveLens);
      img.addEventListener('mousemove', moveLens);
      /*and also for touch screens:*/
      // lens.addEventListener("touchmove", moveLens);
      // img.addEventListener("touchmove", moveLens);
      function moveLens(e: any) {
        let pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {
          x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
          x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
          y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
          y = 0;
        }
        /*set the position of the lens:*/
        lens.style.left = x + 'px';
        lens.style.top = y + 'px';
        /*display what the lens "sees":*/
        result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
      }
      function getCursorPos(e: any) {
        let a,
          x = 0,
          y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
    }

    function customRightResult() {
      window.addEventListener('load', () => {
        let elementResult: any = document.querySelector('#myresult');

        // ?Lay cac phan tu tinh toan do dai zoom_result
        let container = Array.from(document.getElementsByClassName('container'));

        if (!container[1]) return;
        // console.log(container[1].clientWidth);
        let product_image: any = document.querySelector('.product_image');
        let num: any = (product_image.clientWidth * 100) / container[1].clientWidth;
        // console.log("phan tram cua product_image:" + num.toFixed());

        let widthOfResult = 98 - num.toFixed();
        // console.log("phan tram cua result:" + widthOfResult);

        if (typeof elementResult != 'undefined') {
          if (widthOfResult > 51) {
            widthOfResult = 51;
            elementResult.style.width = widthOfResult + '%';
          } else {
            elementResult.style.width = widthOfResult + '%';
          }
        }
      });
    }
    if (!ignore) {
      imageZoom('myimage', 'myresult');
      customRightResult();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className='img-zoom-container'>
      <img alt={previewImg} id='myimage' src={previewImg} />
      <div className='img-zoom-result' id='myresult' />
    </div>
  );
};

export default memo(ImagePreview);
