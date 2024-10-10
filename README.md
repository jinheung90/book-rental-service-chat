# 중고 책 대여 시스템 

### 기술 스택
spring, redis, redis pub/sub, nestjs, socket.io, aws parameter store

ts-migrate-mongoose

### 폴더 구조




### 채팅 플로우

```mermaid
sequenceDiagram;
    actor borrower as 빌리는사람
    
    participant server as chatting_server
    participant redis as redis
    participant mongodb as mongodb
    
    actor lender as 대여해주는사람
    
    borrower ->> server: 연결 (/connect, jwt) clientId, userId 저장
    server ->> mongodb: 읽지 않은 대화기록 요청
    mongodb ->> server: 응답
    server ->> borrower: 대화기록 전송
    borrower ->> server: 채팅 시도(/send)
    server ->> redis: 해당 유저가 접속해 있는지 확인
    redis ->> server: 결과 응답 (clientId, userId ...)
    server ->> mongodb: 대화 저장
    mongodb ->> server: 응답
    alt is online?
        server ->> lender: 전달 (redis의 유저 정보로)
        lender ->> server: 응답으로 읽음 상태 전해주기
    else
        server ->> borrower: 유저가 오프라인 입니다.
    end
    
```


## @NX
```
eslint 에러로 인한 버전 다운 그레이드 (eslint 8.55.0)
https://github.com/nrwl/nx/issues/20943
```

