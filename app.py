from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import trashmodel4
import os
import base64
import os
import glob
app = Flask(__name__)
CORS(app)

# 한글 출력을 위한 설정 추가
app.config['JSON_AS_ASCII'] = False

@app.route('/detection', methods=['GET', 'POST'])
def show_results():
    parsed_request = request.files.get('file')
    
    if parsed_request is None:
        print('777777777777777777777777777777777777777777777')
        return jsonify({'error': 'ggggggg'}), 400, {'Content-Type': 'application/json; charset=utf-8'}
    print(parsed_request,'----------------------+++++++++++++++++++++++++')
    # 저장할 파일 경로 설정
    save_dir = os.path.join(app.root_path, 'uploaded_images') #어플리케이션 루트경로
    os.makedirs(save_dir, exist_ok=True)
    save_path = os.path.join(save_dir, 'uploaded_image.jpg')

    # 파일 저장
    parsed_request.save(save_path)

    # 이미지 URL 반환

    # total_path = 'C:/Users/db030/Desktop/aimodel'  # 추후 data에서 URI 가져올것
    #  업로드된 이미지 경로로 변경
    image_path='C:/Users/db030/Desktop/aimodel/Plogging-Helping-System/src/detect/uploaded_images/uploaded_image.jpg'
    # text_path=total_path+"/runs/"+recent_file+'../labels/uploaded_image.txt'
    result1 = trashmodel4.predict_trash(image_path)
    detection_results = trashmodel4.detect_trash(image_path)
    directory = os.path.join(app.root_path)#루트경로의 하위경로
    print(directory,"-------------------------------------------")
    recent_file = trashmodel4.find_recent_file(directory)
    # text_path=total_path+'/runs/'+ +'/labels/uploaded_image.txt'

# 특정 디렉토리에서 최근에 생성된 폴더 경로 찾기
    directory = 'C:/Users/db030/Desktop/aimodel/runs/detect'
    newest_folder = max(glob.glob(os.path.join(directory, '*')), key=os.path.getctime)
    print(newest_folder)
    text_path=newest_folder+'/labels/uploaded_image.txt'

# 텍스트 파일 열기
    with open(text_path, 'r') as file:
        lines = file.readlines()  # 파일의 각 줄을 리스트로 읽어오기

# 데이터 배열 생성
    data_array = []
    for line in lines:
        values = line.strip().split()  # 각 줄의 공백을 기준으로 값들을 분리하여 리스트로 저장
        data_array.append(values)
    result2 = None 
# # 결과 확인
    classpre=data_array[0][0]
    print(classpre)
    # if classpre == 0:
    #     result2='0%'
    # elif classpre == 1:
    #     result2='25%'
    # elif classpre == 2:
    #     result2='50%'
    # elif classpre == 3:
    #     result2='75%'
    # elif classpre == 4:
    #     result2='100%'

    # result2 = None
# result2 = None
    # result2 = None
    # if recent_file:
    #     print("가장 최근에 생성된 파일:", recent_file)
    #     # result2_tmp = trashmodel4.display_image(recent_file)
    #     if result2 in [0, 1, 2, 3, 4]:
    #         result2 = {0: '0%', 1: '25%', 2: '50%', 3: '75%', 4: '100%'}.get(result2, "파일을 찾을 수 없습니다.")
    # else:
    #     print("파일을 찾을 수 없습니다.")
    if classpre == '0':
        result2='0'
    elif classpre == '1':
        result2='25'
    elif classpre == '2':
        result2='50'
    elif classpre == '3':
        result2='75'
    elif classpre == '4':
        result2='100'
    else:
        result2='30'
    result3 = trashmodel4.process_image(image_path)
    print(result2)
    response = {
        'result1': result1,
        'result2': result2 if result2 else "파일을 찾을 수 없습니다.",
        'result3': result3
}

    return jsonify(response)

@app.route('/result', methods=['GET', 'POST'])
def show_result_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=5000)
