const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    //retrieves the elements of the form
    const firstName = document.getElementById( "firstName" )
    const lastName = document.getElementById( "lastName" )
    const address = document.getElementById( "address" )
    const shirts = document.querySelector( 'input[name="numShirts"]:checked' )
    const jackets = document.querySelector( 'input[name="numJackets"]:checked' )
    const hats = document.querySelector( 'input[name="numHats"]:checked' )

    if(firstName && lastName && address && shirts && jackets && hats){
        //checks to make sure the input own value is not checked
        let s;
        if(shirts.value < 0){
            try{
                s = document.getElementById( "s4t" ).value;
            } catch(err){
                console.log(err);
                s = 0
            }
        }
        else{
            s = shirts.value;
        }
        //checks to make sure the input own value is not checked
        let j;
        if(jackets.value < 0){
            try{
                j = document.getElementById( "j4t" ).value;
            } catch(err){
                console.log(err);
                j = 0
            }
        }
        else{
            j = jackets.value;
        }
        //checks to make sure the input own value is not checked
        let h;
        if(hats.value < 0){
            try{
                h = document.getElementById( "h4t" ).value;
            } catch(err){
                console.log(err);
                h = 0
            }
        }
        else{
            h = hats.value;
        }
        console.log(`num shirts ${s}\n num jackets ${j}\n num hats ${h}`);
        //creates a json with the information contained within the form
        const json = {firstName: firstName.value, lastName: lastName.value, address: address.value, shirts:s, jackets:j, hats:h};
        const body = JSON.stringify(json);
        //sends a post request to the server
        await fetch( "/order/place", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: body
        }).then( (response) =>
        {console.log(response)
       });
    }
    else{
        console.log("Error: failed to fetch form elements")
    }
}

window.onload = function() {
    const button = document.getElementById("submit");
    button.onclick = submit;
}