# frontend 개발 실습
* <span style="color: blue;">작업 관련 참조 소스는 git소스의 **example** 폴더에서 참조.</span>

::: tip 실습 가정
* 업무명은 '검색(search)' 라고 한다.
* domains폴더에 **search**업무 폴더를 생성하여 진행한다.
* 만들 페이지는 **SearchList** 페이지 이다. 페이지를 **pages**폴더에 생성해서 작업한다.
* **SearchList** 페이지에서 **/api/v1/search** api를 이용하여 전역 state에 데이타를 저장한다.
* 전역 state에 저장되어있는 검색 리스트(search) 전역 상태값을 가져와 화면에 표현해본다.
:::

## 검색 리스트 API 
---
* 검색 api 참조 url : https://hn.algolia.com/api/v1/search
* call method: **GET**
* request 파라미터: 없음.

## 검색 리스트 퍼블
---
* e-mail로 따로 제공.