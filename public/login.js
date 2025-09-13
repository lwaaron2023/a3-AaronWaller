//defines public key for encryption
let publicKey;
const textEncoder = new TextEncoder();
/*
Sets up the keys so that the password can be encrypted when sent
 */
window.onload = async () => {
    await fetch("/auth/publicKey", {
        method: "GET",
    }).then((response) => {
        try {
            response.json().then(data => {
                //Extracts and stored the public key
                // console.log(data)
                crypto.subtle.importKey("jwk",data, {name: "RSA-OAEP", hash: { name: "SHA-256" }}, true, ["encrypt"]).then(
                    (key)=>{publicKey = key},
                );
                // console.log(publicKey);
            })
        } catch (error) {
            console.error(error);
        } finally {
            const button = document.getElementById("submit");
            button.onclick = onSubmit;
        }
    })
}

/*
Handles the submission of the login and password, encrypts them using a E2EE method: RSA-OAEP
 */
const onSubmit = async (event) => {
    event.preventDefault()

    const username = document.getElementById( "username" )
    const password = document.getElementById( "password" )

    if(username && password){
        //Separate check from whether the public key exists
        // console.log(publicKey);
        if(publicKey instanceof CryptoKey){
            //Only sends if it has the public in which to encrypt
            //creates a json with the information contained within the login in encrypted form
            if( username.value.includes('/') || password.value.includes('/')){
                //illegal character-- do nothing
            }
            else {
                console.log();

                window.crypto.subtle.encrypt({
                    name: 'RSA-OAEP',
                }, publicKey,textEncoder.encode(username.value + '/' + password.value)).then((ciphertext)=>{

                        let buffer = new Uint8Array(ciphertext, 0);
                        fetch("/auth", {
                            method: "POST",
                             headers: {"content-type":"application/octet-stream"},
                            body: buffer,
                        }).then((response) => {
                            console.log(response)
                         })
                    }

                )
            }

        }

    }




}