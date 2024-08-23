// 儲存註冊資訊到Local Storage
function registerUser() {
    let name = document.getElementById("regName").value;
    let phone = document.getElementById("regPhone").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if (name && phone && email && password) {
        // 將註冊資料儲存到Local Storage
        localStorage.setItem("user", JSON.stringify({ name, phone, email, password }));
        alert("註冊成功！");
        document.getElementById("registerForm").reset(); // 清空表單
        let registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide(); // 隱藏註冊模態框
    } else {
        alert("請完整填寫表單！");
    }
}

// 登入功能
function loginUser() {
    let email = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // 保存登入狀態
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUser", storedUser.name);

        alert("登入成功！歡迎回來，" + storedUser.name + "!");
        let loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide(); // 隱藏登入模態框
        updateNavBar();
    } else {
        alert("帳號或密碼錯誤，請重試！");
    }
}

// 登出功能
function logoutUser() {
    // 清除登入狀態
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    alert("您已登出！");
    updateNavBar();

    // 跳轉到index.html
    window.location.href = "index.html";
}

// 更新NavBar顯示
function updateNavBar() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userName = localStorage.getItem("loggedInUser");

    if (isLoggedIn) {
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("registerButton").style.display = "none";
        document.getElementById("userDropdown").style.display = "block";
        document.getElementById("userNameDisplay").textContent = userName;
        document.getElementById("uploadLink").style.display = "block"; // 顯示 "走失刊登" 連結
    } else {
        document.getElementById("loginButton").style.display = "inline-block";
        document.getElementById("registerButton").style.display = "inline-block";
        document.getElementById("userDropdown").style.display = "none";
        document.getElementById("uploadLink").style.display = "none"; // 隱藏 "走失刊登" 連結
    }
}

// 網頁載入時檢查登入狀態
document.addEventListener('DOMContentLoaded', function () {
    updateNavBar();
});
