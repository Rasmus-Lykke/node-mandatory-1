const image = ` <div class="iamge" style="margin: 20px;">
                    <img src="jquery.jpg" alt="Nodemon example">
                </div>`

$(".jquery-btn-two").hide();
$(".jquery-btn-three").hide();
$(".last-jquery-btn").hide();

$(".jquery-btn").click(()=>{
    $(".jquery-btn").remove();
    $(".jquery-btn-two").show();

    $("#jquery-btn-div p").text("Oops... This is a funny one, Mabye click it again?");

});

$(".jquery-btn-two").click(()=>{
    $("#jquery-btn-div p").remove();
    $(".jquery-btn-three").show();
    $(".jquery-btn-three").text("Psst! Hover over me!");
    $("#jquery-btn-div").append("<p> Oh no! Now theres two of them!</p>");

});

$('.jquery-btn-three').mouseover(() => {
    $('.jquery-btn-three').text("Click me and you will regret it!");
    $(".jquery-btn-two").remove();
    $("#jquery-btn-div p").remove();
    $("#jquery-btn-div").append("<p> What happened? One of the buttons dissapeared?</p>");

    $('.jquery-btn-three').attr("title", "Are you sure???");
    
}).on('mouseleave', () => {
    $('.jquery-btn-three').attr("title", "That was better!");
});

$(".jquery-btn-three").click(()=>{
    $("#jquery-btn-div p").remove();
    $(".jquery-btn-three").remove();
    
    $("#jquery-btn-div").append(image);

    $("#jquery-div p").css("color", "blue");

});