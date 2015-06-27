(function(){

	var App = {
		section:'section',
		includePlugin:function(){
			var header = $('.header'),
			footer = $('.footer');

			$(".article").onepage_scroll({
			   sectionContainer: this.section,     // sectionContainer accepts any kind of selector in case you don't want to use section
			   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
			                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
			   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
			   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
			   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
			   beforeMove: function(index) {
				/*header.stop().animate({top:-header.height()});
				footer.stop().animate({bottom:-footer.height()});*/
			   },  // This option accepts a callback function. The function will be called before the page moves.
			   afterMove: function(index) {
				/*header.stop().animate({top:0},700);
				footer.stop().animate({bottom:0},700);*/
			   },   // This option accepts a callback function. The function will be called after the page moves.
			   loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
			   keyboard: true,                  // You can activate the keyboard controls
			   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
			                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever 
			                                    // the browser's width is less than 600, the fallback will kick in.
			   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
			});
		},
		changeUI:function(){
			var ww = $(window).width(),
			wh = $(window).height(),
			header = $('.header'),
			footer = $('.footer'),
			projectImagesContainer = $('.works ul'),
			projectImages = $('.works ul li img'),
			contentHeight = wh-(header.height()+footer.height()),
			imageNaturalSize = 300,
			naturalMargin = 5,
			imageHeight = Math.floor(contentHeight/2);
	 		
	 		//Projects images thumbinials settings
 			if(imageHeight >= imageNaturalSize){
				projectImages.css({height:imageNaturalSize,marginTop:Math.floor((contentHeight - imageNaturalSize*2 )/ 3 ),marginLeft:Math.floor((ww - imageNaturalSize*4)/5)});
			}
			else{
				projectImages.css({height:imageHeight-naturalMargin*2,marginTop:naturalMargin,marginLeft:Math.floor((ww - imageHeight*4)/4)})

			}
			
		},
		setSkills:function(){
			$('.skills .progress').each(function(){
				var progress = $(this).attr('data-progress');
				$(this).css({width:progress});
			})
		},
		mobileMenue:function(){

			var navigation = $(".navigation");

			$(".mobile-nav").on("click",function(){
				navigation.stop().slideToggle(400,function(){
					if($(this).is(":visible")){
						 $(document.body).off('click').on('click',function(event){
						 	$(document.body).off('click'); //unbind event
						 	navigation.slideUp();
						 }); 
					}
				});
			});

			//window resize
			$(window).resize(function(){
				var windowWidth = window.outerWidth;
				if(windowWidth>768){
					navigation.show();
				}else{
					navigation.hide();
				}
			});
			 

			
		}
		
	}
	
	
	App.includePlugin(); 
	//App.changeUI();
	App.setSkills();
	App.mobileMenue();

})();