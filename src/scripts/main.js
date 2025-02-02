$(document).ready(function () {
    $("form").on("submit",(e) => {
        e.preventDefault();
        $("ul li span").text("");
        $("ul li span").text(parseInt(Math.random() * $("input").val()) + " !");
    });
});