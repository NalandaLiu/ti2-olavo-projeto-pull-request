const botaoLogar = document.getElementById("login-btn");
const loginURL = "http://localhost:8080/auth/login";


botaoLogar.addEventListener("click", async ()=>{
    const user = document.getElementById("username").value;
    const psswd = document.getElementById("psswd").value;
    
    const body = {
        "email": user,
        "password": psswd
    }
    console.table(body);

    try {
        const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    

        if (response.ok) {
            const data = await response.json();

            const token = data.token;
    
            // Set the JWT as a cookie (valid for 7 days, secure, and same-site restricted)
            document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
    
            console.log('JWT armazenado nos cookies');
            // Redirect to profile page
            window.location.href = "http://127.0.0.1:5501/src/front/pages/perfil.html";
        } else {
            console.error("O login falhou: Status - " + response.status);
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = 'O usuário ou a senha estão incorretos';
        }
    } catch (error) {
        // Log any error that occurs during the fetch or processing
        console.error("Erro durante a solicitação de login:", error);
    }
});
