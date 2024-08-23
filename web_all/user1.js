// 儲存註冊資訊到Local Storage
// 驗證姓名長度
document.getElementById("regName").addEventListener("input", function() {
    let name = this.value;
    let nameError = document.getElementById("nameError");

    if (name.length < 2) {
        nameError.textContent = "姓名長度必須至少為2個字符。";
    } else {
        nameError.textContent = ""; // 清除错误信息
    }
});

// 驗證電話
document.getElementById("regPhone").addEventListener("input", function() {
    let phone = this.value;
    let phoneError = document.getElementById("phoneError");

    // 正則表達式
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        console.log("Invalid email format"); // 測試用
        phoneError.textContent = "請輸入有效的10位數電話號碼。";
    } else {
        phoneError.textContent = ""; // 清除錯誤訊息
    }
});

// 驗證email
document.getElementById("regEmail").addEventListener("input", function() {
    let email = this.value;
    let emailError = document.getElementById("register_emailError");

    // 正則表達式
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        console.log("Invalid email format"); // 測試用
        emailError.textContent = "請輸入有效的電子郵件地址。";
    } else {
        emailError.textContent = ""; // 清除錯誤訊息
    }
});

// 驗證密碼長度
document.getElementById("regPassword").addEventListener("input", function() {
    let password = this.value;
    let passwordError = document.getElementById("register_passwordError");

    if (password.length < 8) {
        console.log("Invalid email format"); // 測試用
        passwordError.textContent = "密碼長度必須至少為8個字符。";
    } else {
        passwordError.textContent = ""; // 清除錯誤訊息
    }
});

// 注册功能
function registerUser() {
    let name = document.getElementById("regName").value;
    let phone = document.getElementById("regPhone").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    // 在提交时再进行一次验证
    if (name.length < 2) {
        alert("姓名長度必須至少為2個字符。");
        return;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("請輸入有效的10位數電話號碼。");
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("請輸入有效的電子郵件地址。");
        return;
    }

    if (password.length < 8) {
        alert("密碼長度必須至少為8個字符。");
        return;
    }

    // 将注册资料保存到Local Storage
    localStorage.setItem("user", JSON.stringify({ name, phone, email, password }));
    alert("註冊成功！");
    document.getElementById("registerForm").reset(); // 清空表单
    let registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide(); // 隐藏注册模态框
}


// 登入功能
// 驗證email格式
document.getElementById("floatingInput").addEventListener("input", function() {
    let email = this.value;
    let emailError = document.getElementById("emailError");

    // 驗證email格式
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "請輸入有效的電子郵件地址。";
    } else {
        emailError.textContent = ""; // 清除錯誤訊息
    }
});

// 驗證密碼長度
document.getElementById("floatingPassword").addEventListener("input", function() {
    let password = this.value;
    let passwordError = document.getElementById("passwordError");

    if (password.length < 8) {
        passwordError.textContent = "密碼長度必須至少為8個字符。";
    } else {
        passwordError.textContent = ""; // 清除錯誤訊息
    }
});

// 登入功能
function loginUser() {
    let email = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;

    // 送出時再進行一次驗證
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("請輸入有效的電子郵件地址。");
        return;
    }

    if (password.length < 8) {
        alert("密碼長度必須至少為8個字符。");
        return;
    }

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // 保存登錄狀態
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUser", storedUser.name);

        alert("登入成功！歡迎回來，" + storedUser.name + "!");
        let loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide(); // 隱藏登入框
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


// 清除localstorage, 沒事不要開
function allgone() {
    localStorage.clear();
    location.reload(); // 刷新页面
}
