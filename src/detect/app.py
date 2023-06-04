from flask import Flask, render_template
import trashmodel4
import cv2

app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def show_results():
    new_image_path = 'C:/Users/db030/Desktop/aimodel/testimage.jpg'
    result1 = trashmodel4.predict_trash(new_image_path)

    weights_path = "C:/Users/db030/Desktop/aimodel/exp28-20230604T084521Z-001/exp28/weights/best.pt"
    new_image = cv2.imread('C:/Users/db030/Desktop/aimodel/exp3-20230604T085454Z-001/exp3/trash613.png')
    result2 = trashmodel4.detect_trash(weights_path, new_image)

    image_path = 'C:/windows_v1.8.1/trash-20230423T171738Z-001/trash/trash613.png'
    result3 = trashmodel4.process_image(image_path)

    # 결과를 템플릿에 전달하여 렌더링합니다.
    return render_template('index.html', result1=result1, result2=result2, result3=result3)

if __name__ == '__main__':
    app.debug=True
    app.run()
