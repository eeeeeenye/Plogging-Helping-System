import cv2
import numpy as np
from keras.models import load_model

def predict_trash(new_image_path):
    model = load_model('C:/Users/db030/Desktop/aimodel/fai.h5') 
    new_image = cv2.imread(new_image_path)

    category_mapping = {0: "person", 1: "hand", 2: "trash"}

    if new_image is None:
        print("이미지 불러오기 실패")
        return None
    
    image_w = 64
    image_h = 64
    
    new_image = cv2.resize(new_image, (image_w, image_h))
    new_image = new_image.astype(float) / 255

    prediction = model.predict(np.array([new_image]))
    predicted_class = np.argmax(prediction)

    if predicted_class == 0:
        return "사람이 더 많게 찍힌 것으로 추정됩니다. 주의해서 진행해주세요"
    elif predicted_class == 1:
        return "손이 보이도록 찍힌 것으로 추정됩니다. 쓰레기 봉투의 리터가 보일 수 있도록 해주세요."
    elif predicted_class == 2:
        return "쓰레기봉투가 잘 보이네요!"

def detect_trash(weights_path, new_image_path):
    new_image = cv2.imread(new_image_path)
    output_image = "C:/Users/db030/Desktop/aimodel/exp3-20230604T085454Z-001/exp3/trash613.png"

    output_img = cv2.imread(output_image)
    cv2.imshow("Output Image", output_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def process_image(image_path):
    extracted_numbers = extract_numbers_from_image(image_path)
    string_num = convert_numbers_to_string(extracted_numbers)
    updated_string_num = remove_last_value(string_num)
    return int(updated_string_num)

# 테스트 코드
new_image_path = 'C:/Users/db030/Desktop/aimodel/testimage.jpg'
result1 = predict_trash(new_image_path)

weights_path = "C:/Users/db030/Desktop/aimodel/exp28-20230604T084521Z-001/exp28/weights/best.pt"
new_image_path = 'C:/Users/db030/Desktop/aimodel/exp3-20230604T085454Z-001/exp3/trash613.png'
result2 = detect_trash(weights_path, new_image_path)

image_path = 'C:/windows_v1.8.1/trash-20230423T171738Z-001/trash/trash613.png'
result3 = process_image(image_path)

print(result1)
print(result2)
print(result3)