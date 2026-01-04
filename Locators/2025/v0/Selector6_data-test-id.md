# Selector6_data-test-id
* Data-test-id Selector: Selects elements by a custom attribute (data-testid), commonly used in testing.
* https://playwright.dev/docs/locators#locate-by-test-id

## app.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Page</title>
    <link rel="stylesheet" href="app.css">
</head>

<body>

<div class="box">
    <div class="form">
        <h2>Login</h2>

        <div class="inputBox">
            <input data-testid="username" type="text" required="required">
            <span>Username</span>
            <i></i>
        </div>

        <div class="inputBox">
            <input data-testid="password" type="password" required="required">
            <span>Password</span>
            <i></i>
        </div>

        <input data-testid="login" type="submit" value="Login">
    </div>
</div>

</body>
</html>
````

## app.css
````css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #23242a;
}

.box {
    position: relative;
    width: 380px;
    height: 420px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
}

.box::before,
.box::after {
    content: '';
    position: absolute;
    width: 380px;
    height: 420px;
    background: linear-gradient(0deg, transparent, #45f3ff, #45f3ff);
    animation: animate 6s linear infinite;
    transform-origin: bottom right;
}

.box::after {
    animation-delay: -3s;
}

@keyframes animate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.form {
    position: absolute;
    inset: 2px;
    border-radius: 8px;
    background: #28292d;
    z-index: 10;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
}

.form h2 {
    color: #45f3ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
}

.inputBox {
    position: relative;
    width: 100%;
    margin-top: 35px;
}

.inputBox input {
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1em;
    letter-spacing: 0.05em;
    z-index: 10;
}

.inputBox span {
    position: absolute;
    left: 0;
    padding: 20px 10px 10px;
    font-size: 1em;
    color: #8f8f8f;
    pointer-events: none;
    transition: 0.5s;
}

.inputBox input:valid ~ span,
.inputBox input:focus ~ span {
    color: #45f3ff;
    transform: translateY(-34px);
    font-size: 0.75em;
}

.inputBox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #45f3ff;
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
}

.inputBox input:valid ~ i,
.inputBox input:focus ~ i {
    height: 44px;
}

input[type="submit"] {
    border: none;
    outline: none;
    background: #45f3ff;
    padding: 11px 25px;
    width: 100px;
    margin-top: 20px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}

input[type="submit"]:active {
    opacity: 0.8;
}
````

* preview web
<img src="https://i.imgur.com/q5xUwNW.png">
