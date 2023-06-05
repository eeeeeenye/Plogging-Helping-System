import cv2
import subprocess
import tempfile

def detect_trash(new_image):
    # 이미지 데이터를 파일로 저장
    temp_image = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False)
    cv2.imwrite(temp_image.name, new_image)

    output_image = "C:/Users/db03/Desktop/aimodel/testimage.jpg"
    weights_path = "C:/Users/db030/Desktop/aimodel/exp28-20230604T084521Z-001/exp28/weights/best.pt"

    command = [
        "python",
        "C:/Users/db03/Desktop/aimodel/detect.py",
        "--weights",
        weights_path,
        "--img",
        "320",
        "--conf",
        "0.5",
        "--source",
        temp_image.name,
        "--output",
        output_image
    ]

    subprocess.run(command)

    # 임시 파일 삭제
    temp_image.close()

    # 출력 이미지 표시
    output_img = cv2.imread(output_image)
    cv2.imshow("Output Image", output_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# 테스트
new_image = cv2.imread('C:/Users/db030/Desktop/aimodel/exp3-20230604T085454Z-001/exp3/trash613.png')
detect_trash(new_image)
