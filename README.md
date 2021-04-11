# nodejs-arduino-snowpack


## 작업 주의
- 보통 snowpack 세팅에서는 npm run dev으로 dev 서버를 동작시키지만
- 우리는 우리가 직접 서버를 동작시키고 그게 클라이언트와 websocket을 주고 받기때문에
- 코드 수정할때 마다 npm run build 를 하고 node server.js 로 직접 실행시킨다 
- (실시간 바뀌는건 현재 보류)

## 설치 및 실행

``` bash
# 인스톨하기 (처음에만)
npm install

# 로컬서버는 사용하지 않는다!!!
이건 사용하지 않음 npm run dev

# 아두이노 포트 알아내기
server.js serialport 부분에서 자기 연결 포트로 변경할것

# 빌드하기: src 파일 + 노드 모듈 -> dist 파일들로 만들어짐
npm run build

# 우리 서버 동작시키키
node server.js
```

## 코드 설명
- 작업할때는 server.js 와 src 폴더안에 들어가 있는 파일들을 건드린다.
- npm run build 하면 build 폴더가 만들어 진다. src 폴더와 build 폴더를 비교해보라.
- 실행될 때는 server.js가 dist 안에 있는 파일을 서빙한다. server.js의 index.html 경로가 build/index.html이다.
- build 폴더안에 있는 파일을 직접 건드리지 말라.
- 아두이노에서 시리얼 데이터가 0-1023으로 변하면 그값을 0-1로 바꾸고 3.14를 곱한값으로 큐브를 회전시킨다.

## ues this arduino code
connect potetionmeter to analogpin

```
int analogPin=1;
int currentValue=0;
int previousValue=0;


void setup()
{
  Serial.begin(9600);
}
 
void loop() 
{
  previousValue = currentValue;
  currentValue = analogRead(analogPin);
  
  if (previousValue != currentValue) {
    
    int difference = abs(previousValue - currentValue);
    
    if(difference > 10){
    
    Serial.println(currentValue);

    }
 }
 delay(100);
}
```