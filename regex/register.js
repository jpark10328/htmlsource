//
$(function () {
  $("#userid").on("change", function () {
    const regex = /(?=^[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}/;

    let userid = $("#userid").val();

    if (!regex.test(userid)) {
      alert("아이디는 영문자,숫자 조합으로 6~12자리로 입력하셔야 합니다.");
      $("#userid").focus();
      return false;
    }
  });
  $("#userpw").on("change", function () {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&])[A-Za-z\d@#$%^&]{8,15}$/;

    let userpw = $("#userpw").val();

    if (!regex.test(userpw)) {
      alert("비밀번호는 영문자,숫자,특수문자 조합으로 8~15자리로 입력하셔야 합니다.");
      $("#userpw").focus();
      return false;
    }
  });
  //비밀번호 재입력
  $("#confirmpwd").on("change", function () {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&])[A-Za-z\d@#$%^&]{8,15}$/;

    let confirmpwd = $("#confirmpwd").val();
    let userpw = $("#userpw").val();

    if (!regex.test(confirmpwd)) {
      alert("비밀번호는 영문자,숫자,특수문자 조합으로 8~15자리로 입력하셔야 합니다.");
      $("#confirmpwd").focus();
      return false;
    }

    if (confirmpwd != userpw) {
      alert("이전과 동일한 비밀번호를 입력해 주세요");
      $("#confirmpwd").focus();
      return false;
    }
  });

  //성별
  $(":radio[name='gender']").focusout(function () {
    if (!$(this).is(":checked")) {
      alert("성별을 확인해 주세요");
      $("#gender_m").prop("checked", true);
      return false;
    }
  });

  //이메일
  $("#email").on("change", function () {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let email = $("#email").val();

    if (!regex.test(email)) {
      alert("이메일 형식을 확인해 주세요");
      $("#email").focus();
      return false;
    }
  });

  //핸드폰
  $("#mobile").on("change", function () {
    const regex = /^\d{3}\d{4}\d{4}$/;

    let mobile = $("#mobile").val();

    if (!regex.test(mobile)) {
      alert("핸드폰 형식을 확인해 주세요");
      $("#mobile").focus();
      return false;
    }
  });

  //취미
  $("#join").submit(function () {
    if (!$("input[name='hobby']").is(":checked")) {
      alert("취미를 확인해 주세요");
      return false;
    }
    return true;
  });
});
