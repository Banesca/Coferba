<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mail_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}

        public function	sendMail($title,$to,$body)
        {

            $param = $this->getMailSmtp();
            $config = array(
                'protocol' => 'smtp',
                'smtp_host' => 'coferba.com.ar',
                'smtp_user' => $param['0']['value'], 
                'smtp_pass' => $param['1']['value'], 
                'smtp_port' => '465',
                'smtp_crypto' => 'ssl',
                'mailtype' => 'html',
                'wordwrap' => TRUE,
                'charset' => 'utf-8'
            );

            $this->load->library('email', $config);
            $this->email->set_newline("\r\n");
            $this->email->from($param['0']['value']);
            $this->email->subject($title);


            $body = "
            <!DOCTYPE html>
            <html lang='es'>
            <head>
            </head>


           
            <body style='  text-align: center;'>


          

           <img width='1000' src='https://win-social.com/win_page/img/Asset_1.png'>
           
           <br>
           <br>

           <label style='
           font-size: 25px;
           width: 900x;

           color: #acd063;
           background-color: #14162b;
           font-family: sans-serif;
           padding: 18px;'>".$title."</label>
           <br>
           <br>


            <div
            
            style=' font-size: 22px;
            color: #656464;
            font-family: sans-serif;'>
           ".$body."
           </div>
           <br>

            <img width='1000' src='https://win-social.com/win_page/img/Asset_2.png'> 
           

            </body>
            </html>";

            /**
             * <img src='https://win-social.com/win_page/img/Asset_1.png'> 
            <div>
            ".$body."
            </div>
             */
          
                $this->email->message($body);

                $this->email->to($to);

                $rs = $this->email->send(FALSE);
                

             

                if($rs){
                    //print_r($rs);
                //$this->response("Solicitud Enviada",200);

                }else {

                   return $rs;
                }
            }



            private function getMailSmtp()
            {
                $param = null;
                
                
                        $query =  $this->db->select("*")->from("tb_sys_param")->get();
                        if ($query->num_rows() > 0) {
                            $param = $query->result_array();
                        }
                        return $param;
            }
        
    }
    ?>