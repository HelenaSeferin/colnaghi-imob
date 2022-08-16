class Header extends HTMLElement {
	connectedCallback() {
      this.innerHTML = `
      <header id="header" class="fixed-top ">
        <div class="container d-flex align-items-center">  
          <h1 class="logo me-auto">
		  	<a href="index.html">
			  <img src="assets/img/logo.png" alt="">
			 </a>
		</h1>	  
          <nav id="navbar" class="navbar">    
            <ul class="nav-mobile">
              <li class="bi-list bi-x desk-none"></li>
              <li class="desk-none">
                <a href="index.html" class="logo-mobile">
                <img src="assets/img/logo.png" alt=""></a>
              </li>
              <li class="dropdown dropdown-mobile">
                <a href="#">
                  <span>Sobre nós</span> 
                  <i class="bi bi-chevron-down"></i>
                  </a>
                <ul>
                  <li>
                    <a href="#">Sobre nós</a>
                  </li>                  
                  <li>
                    <a href="#">Trabalhe conosco</a>
                  </li>
                </ul>
              </li>
			  </li>
              <li>
                <a class="nav-link" href="#">Lançamentos</a>
              </li>
			  <li>
			  	<a class="nav-link" href="#">Comerciais</a>
			  </li>
              <li>
                <a class="nav-link" href="#">Anuncie seu imóvel</a>
              </li>
              <li>
                <a class="nav-link" href="#">Blog</a>
             </li>			
              <li>
                <a class="nav-link" href="#">Meus Favoritos</a>
              </li>
              <li>
                <a class="getstarted" href="#">Entrar</a>
              </li>
            </ul>
                  
          </nav> 
          <div class=" mobile-nav-toggle">
          <span></span>
          <span class="menu-small"></span>
          <span></span>
        </div>  
        </div>
      </header>
		  `
	  }
  }
  
  //Footer
  
  class Footer extends HTMLElement {
	connectedCallback() {
	  this.innerHTML = 
		`
		<footer id="footer">
			<div class="footer-top">
				<div class="container">
					<div class="row">	
						<div class="col-lg-4 col-md-6 text">
							<p>Nós trabalhamos incansavelmente para oferecer uma experiência intensa e apaixonante na busca pelo novo lar.  <br><br>
							<strong>Conheça o nosso jeito!</strong></p>
						</div>	
						<div class="col-lg-5 col-md-6 links">
							<div class="social-links">
								<a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
								<a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
								<a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
								<a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
							</div>
							<div class="address">
								<h4>Our Rua Dona Laura, 233 - Rio Branco, Porto Alegre - RS, <br> 90430-091
							</h4>
							<ul class="contacts">
								<li><i class="bx ri-phone-line"></i> <a href="#" class="link">51 3331.2944</a></li>
								<li><i class="bx bxl-whatsapp"></i> <a href="#" class="link">51 99962.4252</a></li>
							</ul>
						</div>           
					</div>	       	
					<div class="col-lg-3 col-md-6 footer-links">
						<h3>Política de Privacidade</h3>				
						<div class="sitemap">
							<div class="row">
							<ul class="col-6">
								<li><a href="#" class="link">Buscar Imóveis</a></li>
								<li><a href="#" class="link">Meus favoritos</a></li>            
								<li><a href="#" class="link">Blog</a></li>
							</ul>
							<ul class="col-6"> 
								<li><a href="#" class="link">Fale conosco</a></li>
								<li><a href="#" class="link">Construtoras</a></li>         
							</ul>
							</div>         
						</div>         				
					</div>	
					</div>
				</div>
			</div>
	
		<div class="container footer-bottom clearfix">
      <hr>
		  <div class="copyright">
        Colnaghi Imóveis <br>
        Imobiliária Porto Alegre com Imóveis Alto Padrão <br>
        CRECI-SP 22.712		  
      </div>
		
		</div>
	  </footer>  
		`
	  
	}
  }
  customElements.define('main-header', Header);
  customElements.define('main-footer', Footer);

//   const slider = document.querySelector('.box-propierties-slide');
// 	let isDown = false;
// 	let startX;
// 	let scrollLeft;

// 	slider.addEventListener('mousedown', e => {
// 	isDown = true;
// 	slider.classList.add('active');
// 	startX = e.pageX - slider.offsetLeft;
// 	scrollLeft = slider.scrollLeft;
// 	});
// 	slider.addEventListener('mouseleave', _ => {
// 	isDown = false;
// 	slider.classList.remove('active');
// 	});
// 	slider.addEventListener('mouseup', _ => {
// 	isDown = false;
// 	slider.classList.remove('active');
// 	});
// 	slider.addEventListener('mousemove', e => {
// 	if (!isDown) return;
// 	e.preventDefault();
// 	const x = e.pageX - slider.offsetLeft;
// 	const SCROLL_SPEED = 2;
// 	const walk = (x - startX) * SCROLL_SPEED;
// 	slider.scrollLeft = scrollLeft - walk;
// });


// CLONE DE ITENS DO CARROSSEL - REMOVER DEPOIS DA INTEGRAÇÃO
function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}

multiplyNode(document.querySelector('.box-clone'), 10, true);

// CLONE DE ITENS DO BAIRRO - REMOVER DEPOIS DA INTEGRAÇÃO
function multiplyNode(node, count, deep) {
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
    }
}

multiplyNode(document.querySelector('.district-box'), 20, true);

