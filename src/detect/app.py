from flask import Flask, jsonify, request
import trashmodel4
import requests
import cv2
import numpy as np

# 이미지 URI
image_uri = "https://ibb.co/Tr3j8FQ"

# 이미지 다운로드 혹은 URI에서 직접 이미지 읽기
response = requests.get(image_uri)
image = cv2.imdecode(np.array(bytearray(response.content)), cv2.IMREAD_COLOR)
app = Flask(__name__)

@app.route('/detection',methods=['POST'])
def show_results():
    data = request.get_json()                                        # 클라이언트로부터 받은 값 가져오기
    data = data[image_uri]

    # new_image_path = 'C:/Users/db030/Desktop/aimodel/testimage.jpg'  # 추후 data에서 URI 가져올것
    result1 = trashmodel4.predict_trash(image_uri)

    weights_path = "C:/Users/db030/Desktop/aimodel/exp28-20230604T084521Z-001/exp28/weights/best.pt"
    new_image = cv2.imread('C:/Users/db030/Desktop/aimodel/exp3-20230604T085454Z-001/exp3/trash613.png')
    result2 = trashmodel4.detect_trash(weights_path, new_image)

    image_path = 'C:/windows_v1.8.1/trash-20230423T171738Z-001/trash/trash613.png'
    result3 = trashmodel4.process_image(image_path)

    response = {
        'result1': result1,
        'result2': result2,         # 쓰레기양
        'result3': result3          # 리터
    }

    # 결과를 템플릿에 전달하여 렌더링
    return jsonify(response)

if __name__ == '__main__':
    app.debug=True
    app.run(host='0.0.0.0')               #port 추가해서 포트 설정가능
