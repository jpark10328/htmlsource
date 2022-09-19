/*
  영화진흥위원회 일일박스오피스 json ==> jquery 작성
*/

let txtYear = $("#txtYear");
let selMon = $("#selMon");
let selDay = $("#selDay");
let msg = $("#msg");

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
  txtYear.val(year);
  selMon.val(month);
  selDay.val(day);
}

function show(movieCd) {
  //alert(movieCd);

  var url =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=" +
    movieCd;

  $.ajax({
    url: url,
    success: function (data) {
      var movieInfo = data.movieInfoResult.movieInfo;

      var movieNm = movieInfo.movieNm;
      var movieNmEn = movieInfo.movieNmEn;
      var showTm = movieInfo.showTm;
      var director = movieInfo.directors[0].peopleNm;
      var actors = movieInfo.actors;

      var temp = "";
      var actors_length = actors.length;
      actors.forEach((item, idx) => {
        if (idx == actors_length - 1) {
          temp += item.peopleNm;
        } else {
          temp += item.peopleNm + ", ";
        }
      });

      let str = "<ul>";
      str += "<li>영화제목 : " + movieNm + "</li>";
      str += "<li>영어제목 : " + movieNmEn + "</li>";
      str += "<li>상영시간 : " + showTm + "분 </li>";
      str += "<li>감독 : " + director + "</li>";
      str += "<li>배우 : " + temp + "</li>";

      $(".box3").htm(str);
    },
  });
}

$(function () {
  init();

  $("#bt1").click(function () {
    //url 생성

    var url =
      "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=";

    url += txtYear.value + selMon.value + selDay.value;

    console.log(url);

    $.ajax({
      url: url,
      success: function (data) {
        var boxOfficeResult = data.boxOfficeResult;
        console.log(boxOfficeResult);

        // 결과 변수 선언
        let str = "";

        boxOfficeResult.dailyBoxOfficeList.forEach((item) => {
          //순위
          str += item.rank + " 위";

          //증감
          var rankInten = parseInt(item.rankInten);
          if (rankInten > 0) str += "(▲";
          else if (rankInten < 0) str += "(▼";
          else str += "(";

          str += rankInten + ") : ";

          //영화코드
          var movieCd = item.movieCd;

          //영화명
          var movieNm = item.movieNm + "<br>";

          str +=
            "<a href='#' onclick='javascript:show(" + movieCd + ")'>" + movieNm + "</a>";
        });
        $(".box3").html(str);
      },
    });
  });
});
