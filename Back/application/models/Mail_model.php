<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mail_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}

        public function	sendMail($title,$to,$body)
        {
            $config = array(
                'protocol' => 'smtp',
                'smtp_host' => 'smtp.googlemail.com',
                'smtp_user' => 'remisasnube@gmail.com', 
                'smtp_pass' => 'AdMg1210#*', 
                'smtp_port' => '465',
                'smtp_crypto' => 'ssl',
                'mailtype' => 'html',
                'wordwrap' => TRUE,
                'charset' => 'utf-8'
            );

            $this->load->library('email', $config);
            $this->email->set_newline("\r\n");
            $this->email->from('remisasnube@gmail.com');
            $this->email->subject($title);

          
                $this->email->message($body);

                $this->email->to($to);

                if($this->email->send(FALSE)){
                //$this->response("Solicitud Enviada",200);

                }else {

                //$this->response($this->email->print_debugger(array('headers')),500);
                }
            }
        
    }
    ?>