    var numberOfSegments = 20;

    for(var i = 0; i < numberOfSegments; i++)
    {
        var horizontal = $(".horizontal-lines").text();
        $(".horizontal-lines").text(horizontal + "-");
        $(".d").text(horizontal + "-");

        var vertical = $(".vertical-lines").text();
        $(".e").text(vertical + "|" + "\n" )
    }
    