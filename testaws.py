import boto3
from flask import Flask, request, send_file
import requests

app = Flask(__name__)

# AWS S3 설정
S3_BUCKET = '//'
S3_ACCESS_KEY = '//'
S3_SECRET_KEY = '//'

@app.route('/upload', methods=['POST'])
def upload_file():
    # 전송된 파일 가져오기
    file = request.files['file']

    # 파일을 S3에 업로드
    s3 = boto3.client('s3', aws_access_key_id=S3_ACCESS_KEY, aws_secret_access_key=S3_SECRET_KEY)
    s3.upload_fileobj(file, S3_BUCKET, file.filename)

    return '파일 업로드 완료'

@app.route('/download', methods=['GET'])
def download_file_from_s3():
    filename='uploaded_image.jpg'
    s3_object_url = 'https://plogging-helping-system.s3.ap-northeast-2.amazonaws.com/{filename}.jpg'
    
    # 객체 다운로드
    response = requests.get(s3_object_url)
    
    # 파일 다운로드
    return send_file(response.content, attachment_filename='image.jpg', as_attachment=True)


if __name__ == '__main__':
    app.run()
