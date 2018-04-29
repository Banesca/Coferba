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
                'smtp_host' => 'smtp.googlemail.com',
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