const daumPostSet = () => {
  console.log('나실행된거 맞아?')

  return `

  <script type="text/javascript" src="https://code.jquery.com/jquery-1.10.2.min.js" /></script>
  <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  <script>
  function openZipSearch() {
      new daum.Postcode({
          oncomplete: function(data) {     
          var addr = ''; 
          if (data.userSelectedType === 'R') { 
              addr = data.roadAddress;
          } else {
              addr = data.jibunAddress;
          }
  
          $("#zip_code").val(data.zonecode);
          $("#addr").val(addr);
          $("#addr_dtl").val("");
          $("#addr_dtl").focus();
          }
      }).open();
  }
  </script>
`
}
export default daumPostSet
