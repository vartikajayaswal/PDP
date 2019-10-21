let products;
let idImage;

//Get the products
const fetchProducts = async () => {
  products = await fetch(
      'https://anatta-demo-app.herokuapp.com/api/products'
  ).then(res => res.json());
};

const showProducts = async () => {
 
  const productSlider = document.getElementById('productSlider');
  const rpSlider = document.getElementById('rpSlider');
  const myThumbnailList = document.getElementById('myThumbnailList');
  
  await fetchProducts();

  products.forEach((productItem,index) => {
    const div = document.createElement('div');
    div.classList.add('recommended-list');

    //Get the indexed images
    let indexedUrl =  ['https://anatta-demo-app.herokuapp.com/api/products/' + ++index + "/image"];
    async function load() {
      let obj = await (await fetch(indexedUrl)).json();

      //Here 1 represents the id of the product. This can be integrated dynamically later once backend is done
      if ((obj[0].id)==1){
        obj.forEach((pdItem) => {
          const pd_image = document.createElement('img')
          pd_image.src = pdItem.url
          pd_image.classList.add('pd-image')

          const li = document.createElement('li')
          li.classList.add('thumbnail-image-list')

          const thumbnail_img = document.createElement('img')
          thumbnail_img.src = pdItem.url
          thumbnail_img.classList.add('thumbnail-image')

          li.appendChild(thumbnail_img)
          myThumbnailList.appendChild(li)

          productSlider.appendChild(pd_image)

          //Slider for product detail section
          var pSliderTns = tns({
            container: '.product-slider',
            items: 1,
            slideBy: 'page',
            navContainer: ".slider-thumbnail",
            navAsThumbnails: true,
            mouseDrag: true,
            loop: false
          });
        })
      }

      const rp_image = document.createElement('img')
      rp_image.src = obj[0].url
      rp_image.classList.add('rp-image')
      div.appendChild(rp_image)
    
    }

    load();
    const rp_name = document.createElement('div');
    rp_name.innerText = productItem.name;
    rp_name.classList.add('rp-name');

    const rp_price = document.createElement('div');
    rp_price.innerText = productItem.price;
    rp_price.classList.add('rp-price');

    
    div.appendChild(rp_price);
    div.appendChild(rp_name);
    
    rpSlider.appendChild(div);
  });


  //Slider for recommended product section
  var rpSliderTns = tns({
    container: '.rp-slider',
    items: 4,
    slideBy: 'page',
    mouseDrag: true,
    disable: true,
    loop:false,
    "responsive": {
      "990": {
        disable: false
      }
    },
  });
};

showProducts();
    


  
  