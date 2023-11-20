const api_key="61a26ed6eb9ec83145af40bff8e367f8";
const acces_token="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWEyNmVkNmViOWVjODMxNDVhZjQwYmZmOGUzNjdmOCIsInN1YiI6IjY1NTkzNGU0YjU0MDAyMTRkMDZmYzhmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4a7E8KuMubGUahjuj-pLdZcC6PpoapWYhC_8-wm5XNU";


const url_base="https://api.themoviedb.org/3/";
const url_base_img="https://image.tmdb.org/t/p/w500";
const get_movies="/discover/movie";
const options={
    method:'GET',
    headers:{
        accept:'application/json',
        Authorization:`Bearer ${acces_token}`
    }
}

const search=document.getElementById('search-form');
const search_result_section=document.querySelector('.search-result-section');
search_result_section.style.display='none'; 
search.addEventListener('submit',function(e){
    e.preventDefault();
    const url = `${url_base}/search/movie?query=${this.search.value}&include_adult=false&language=en-US&page=1`;
    const search_result=document.querySelector('.search-result');
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        search_result_section.style.display='block';
        search_result.innerHTML='';
        (json.results).map(result=>{
            search_result.innerHTML+=`
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div class="custom-block custom-block-overlay">
                <a href="detail-page.html" class="custom-block-image-wrap">
                    <img src=${url_base_img}${result.poster_path} class="custom-block-image img-fluid" alt="">
                </a>

                <div class="custom-block-info custom-block-overlay-info">
                    <h5 class="mb-1">
                        <a href="listing-page.html">
                            ${result.original_title}
                        </a>
                    </h5>

                    <p class="badge mb-0">50 Movie</p>
                </div>
            </div>
        </div>
            `;
        })
      });


})    

async function fetchMovie(api){
    const response=await fetch(api);
    const data=await response.json();
    setCarousel(data.results);
    setDetails(data.results);
}
function setDetails(movies){
    const latest_episode=document.querySelector('.latest-episode');
    const movie_url=[]
    
    movies.map(movie=>{
        const url=`${url_base}/movie/${movie.id}`;
        movie_url.push(url);
    });
    const fetch_movie=movie_url.slice(0,2);
    fetch_movie.forEach((url)=>{
        fetch(url,options).then(res=>res.json()).then(json=>{
            latest_episode.innerHTML+=`
            <div class="col-lg-6 col-12 mb-4 mb-lg-0">
            <div class="custom-block d-flex">
                <div class="">
                    <div class="custom-block-icon-wrap">
                        <div class="section-overlay"></div>
                        <a href=${json.homepage} class="custom-block-image-wrap">
                            <img src=${url_base_img}${json.poster_path} class="custom-block-image img-fluid" alt="">

                            <a href="#" class="custom-block-icon">
                                <i class="bi-play-fill"></i>
                            </a>
                        </a>
                    </div>

                    <div class="mt-2">
                        <a href="#" class="btn custom-btn">
                            ${json.status}
                        </a>
                    </div>
                </div>

                <div class="custom-block-info">
                    <div class="custom-block-top d-flex mb-1">
                        <small class="me-4">
                            <i class="bi-clock-fill custom-icon"></i>
                            ${json.runtime} min
                        </small>

                        <small>${json.tagline} <span class="badge">✨</span></small>
                    </div>

                    <h5 class="mb-2">
                        <a href="detail-page.html">
                            ${json.original_title}
                        </a>
                    </h5>

                    <div class="profile-block d-flex">
                        <img src=${url_base_img}${json.production_companies[0].logo_path} class="profile-block-image img-fluid" alt="">

                        <p>
                        ${json.production_companies[0].name} 
                            <img src="images/verified.png" class="verified-image img-fluid" alt="">
                            <strong>${json.production_companies[0].origin_country} </strong></p>
                    </div>

                    <p class="mb-0">${json.overview}</p>

                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                        <a href="#" class="bi-headphones me-1">
                            <span>120k</span>
                        </a>

                        <a href="#" class="bi-heart me-1">
                            <span>42.5k</span>
                        </a>

                        <a href="#" class="bi-chat me-1">
                            <span>11k</span>
                        </a>

                        <a href="#" class="bi-download">
                            <span>50k</span>
                        </a>
                    </div>
                </div>

                <div class="d-flex flex-column ms-auto">
                    <a href="#" class="badge ms-auto">
                        <i class="bi-heart"></i>
                    </a>

                    <a href="#" class="badge ms-auto">
                        <i class="bi-bookmark"></i>
                    </a>
                </div>
            </div>
        </div>
            `;
        });
    })
}
async function setCarousel(movies){
    const carousel=document.querySelector('.owl-carousel');
    await movies.map(movie=>{
        carousel.innerHTML+=`
        <div class="owl-carousel-info-wrap item">
        <img src=${url_base_img}${movie.poster_path} class="owl-carousel-image img-fluid" alt="">
        <img src="images/${movie.adult==false?'icon_+18':'verified'}.png" class="owl-carousel-verified-image img-fluid" alt="">
        <div class="owl-carousel-info">
            <h6 class="mb-2">${movie.original_title}</h6>

            <span class="badge">${movie.original_language}</span>

            <span class="badge">${movie.release_date}</span>
        </div>

        <div class="social-share">
            <ul class="social-icon">
                <li class="social-icon-item">
                    <a href="#" class="social-icon-link bi-twitter"></a>
                </li>

                <li class="social-icon-item">
                    <a href="#" class="social-icon-link bi-facebook"></a>
                </li>
            </ul>
        </div>
    </div>
        `;
    });
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: true,
        responsiveClass: true,
        responsive:{
            0:{
                items: 2,
            },
            767:{
                items: 3,
            },
            1200:{
                items: 4,
            }
        }
    });
}

const api_url=`${url_base}${get_movies}?api_key=${api_key}`
fetchMovie(api_url)
