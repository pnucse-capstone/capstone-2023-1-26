# 경량화 플랫폼 Jetson을 활용한 버스 내부 모니터링 시스템

> 버스 내부 다중 영상을 Jetson을 이용하여 객체 탐지 및 추적하여 승/하차 인원수 측정 및 사고를 감지하는 서비스입니다.<br>
## 과제 소개
***여러 대의 버스 각각에서*** Jetson을 통한 영상 분석을 통해 승하차 인원 카운트 및 사고 발생 감지  

클라우드 서비스와 연동을 통해 승/하차 인원수 및 실시간 사고 영상을 저장하여 승객과 관리자의 편의를 위한 인터페이스 제공

## 과제 배경 및 목적
서울 교통공사는 2017년부터 교통카드 태그 기반으로 시내버스 혼잡도 데이터를 제공하고 있다. 서울특별 시의 경우, 98.9%의 승객들이 교통카드로 버스를 타고 하차할 때는 하차 태그를 하기 때 문에, 꽤나 정확도가 높다고 할 수 있다. 그러나, 부산시의 경우 하차 태그 비율은 30%, 대구시의 경우 38%로 하차 시 교통카드 태그가 원활히 이루어지고 있지 않다.  
또한, 기존에는 블랙박스를 통해 종점에서 녹화된 영상의 처리가 이루어지므로 실시간으로 사고에 대한 대처가 불가능하다는 문제에 집중하였다.   

***이에 객체 탐지, 추적 모델 및 Jetson을 이용하여 버스 내부 다중 영상을 분석하고 인원의 혼잡도를 측정한 후 이를 서비스로 제공한다. 또한, Jetson을 활용하여 네트워크 에지(Edge)에서 영상 처리를 통해 관리자는 실시간으로 사고 영상을 분석하고 활용할 수 있다.***

## 팀 소개
김민욱 kimmw2_@naver.com   
https://github.com/k-kmw
- YOLOv5를 이용하여 인원수 카운트 구현  
- 사고 발생 여부 탐지 구현  
- HLS 프로토콜을 이용하여 영상 생성 구현

황정호 wjdgh721224@naver.com  
https://github.com/wjdgh224 
- 클라우드 환경설정 및 연동
- MQTT를 이용하여 인원수 발행하는 기능 구현 
- AWS S3에 HLS 프로토콜로 생성된 영상 저장 구현

황현정 whdwlgus12@gmail.com  
https://github.com/seasameoil
- Django 서버 구축 및 프론트엔드 구현
- 클라우드에 저장된 데이터 구독하는 기능 구현 실시간 날씨 API 
- 기반으로 한 혼잡도 계산 방법 구현

## 구성도
![시스템 구성도](https://github.com/pnucse-capstone/capstone-2023-1-26/assets/100478309/b01d5776-0e0f-4fb8-b591-618572217f6f)  

개별 버스에 대한 영상을 Jetson에서 RTSP(Real Time Streaming Protocol)를 이용하여 실시간으로 CCTV영상을 받아온다.

**승차/하차 인원수 측정**: YOLOv5와 DeepSORT를 활용하여 승차/하차하는 승객의 인원수를 측정하고 MQTT 프로토콜을 이용하여 전송. 클라이언트는 토픽에 해당하는 정보를 구독하여 각 버스에 대한 승차/하차 인원수와 넘어짐 여부 정보를 얻을 수 있습니다.

**넘어짐 감지**: YOLOv5와 DeepSORT를 활용하여 넘어짐을 감지하고 넘어짐 감지 시, HLS프로토콜을 이용한 .m3u8파일과 .ts파일을 10초 간격으로 생성합니다. 사고 이후 총 30초의 영상을 생성합니다. 관리자가 사고 사실을 인지하고 영상을 확인할 수 있습니다.

## 시연 영상

## 설치 방법
1. python을 설치 (v3.6 ~ v3.8)
2. 라이브러리 설치
```python
$ pip install -r requirement.txt
```

## 실행 방법
```python
1. RTSP
python track.py --source rtsp:your_rtsp_address
2. video
python track.py --source test.mp4
```

### GPU 사용 방법
1. 자신의 GPU에 호환되는 CUDA 설치
2. CUDA 버전에 맞는 torch, torchvision, torchaudio 설치

이후 실행
```python
1. RTSP
python track.py --source rtsp:your_rtsp_address --device deviceNum
2. video
python track.py --source test.mp4 --device deviceNum
```

### 예상 문제
1. torch에서 CUDA 인식을 못하는 문제
    > GPU에 맞는 CUDA를 설치하고 CUDA와 호환되는 torch, torchivsion, torchaudio를 다시 설치하세요!

2. AttributeError: 'Upsample' object has no attribute 'recompute_scale_factor'
    > File /usr/local/lib/python[3.8]/site-packages/torch/nn/modules/upsampling.py:154, in Upsample.forward(self, input)에서 다음과 같이 설정하세요.
    ```python
    def forward(self, input: Tensor) -> Tensor:
        return F.interpolate(input, self.size, self.scale_factor, self.mode, self.align_corners,
        #recompute_scale_factor=self.recompute_scale_factor
    )
    ```

3. attributeerror: module 'numpy' has no attribute 'float'.
    > numpy 버전을 더 최신 버전으로 설치하세요. 파이썬과 CUDA 및 파이토치 버전에 따라 적절한 버전이 다를 수 있습니다.

## 라이센스
MIT