/*
  영화진흥위원회 일일박스오피스 xml
*/

let txtYear = document.querySelector("#txtYear");
let selMon = document.querySelector("#selMon");
let selDay = document.querySelector("#selDay");
let msg = document.querySelector("#msg");

function init() {
  //어제 날짜 구하기

  //오늘 날짜 확인
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // month 0 : 1월
  var day = today.getDate() - 1; // 어제 날짜

  // 1~9월은 앞에 0 추가 / 1~9 일 앞에 0 추가
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  //어제 날짜 구한 부분을 상단의 날짜 부분에 보여주기
  txtYear.value = year;
  selMon.value = month;
  selDay.value = day;
}

function show(movieCd) {
  //alert(movieCd);

  var url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.xml?key=f5eef3421c602c6cb7ea224104795888&movieCd=" +
    movieCd;

  //fetch 요청
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("데이터가 없습니다.");
      }
      return response.text();
    })
    .then((data) => {
      //console.log(data);
      // movieNm, movieNmEn, showTm, director, actor 의 peopleNm
      // .box3  ul li 사용해서 보여주기
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");

      var movieNm = xml.querySelector("movieNm").textContent;
      var movieNmEn = xml.querySelector("movieNmEn").textContent;
      var showTm = xml.querySelector("showTm").textContent;
      var director = xml.querySelector("director").textContent;
      var actors = xml.querySelectorAll("actor");

      var temp = "";
      var actors_length = actors.length;
      actors.forEach((item, idx) => {
        if (idx == actors_length - 1) {
          temp += item.querySelector("peopleNm").textContent;
        } else {
          temp += item.querySelector("peopleNm").textContent + ", ";
        }
      });

      let str = "<ul>";
      str += "<li>영화제목 : " + movieNm + "</li>";
      str += "<li>영어제목 : " + movieNmEn + "</li>";
      str += "<li>상영시간 : " + showTm + "분 </li>";
      str += "<li>감독 : " + director + "</li>";
      str += "<li>배우 : " + temp + "</li>";

      document.querySelector(".box3").innerHTML = str;
    })
    .catch((error) => {
      msg.innerHTML = error;
    });
}

window.onload = function () {
  init();

  document.querySelector("#bt1").addEventListener("click", getOrder);

  function getOrder() {
    //url 생성

    var url =
      "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.xml?key=f5eef3421c602c6cb7ea224104795888&targetDt=";

    url += txtYear.value + selMon.value + selDay.value;

    console.log(url);

    //fetch 요청
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터가 없습니다.");
        }
        return response.text();
      })
      .then((data) => {
        //console.log(data);

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");

        dailyBoxOffice = xml.querySelectorAll("dailyBoxOffice");
        console.log(dailyBoxOffice);

        // 결과 변수 선언
        let str = "";

        dailyBoxOffice.forEach((item, idx) => {
          //순위
          str += item.querySelector("rank").textContent + " 위";

          //증감
          var rankInten = parseInt(item.querySelector("rankInten").textContent);
          if (rankInten > 0) str += "(▲";
          else if (rankInten < 0) str += "(▼";
          else str += "(";

          str += rankInten + ") : ";

          //영화코드
          var movieCd = item.querySelector("movieCd").textContent;

          //영화명
          var movieNm = item.querySelector("movieNm").textContent + "<br>";

          str +=
            "<a href='#' onclick='javascript:show(" + movieCd + ")'>" + movieNm + "</a>";
        });
        msg.innerHTML = str;
      })
      .catch((error) => {
        msg.innerHTML = error;
      });
  }
};
