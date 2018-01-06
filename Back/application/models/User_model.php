<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model
{
	
	public function __construct()
	{
        parent::__construct();
        parent::__construct();
        /*MAIL*/ $this->load->model('mail_model');
	}

 	public function auth($user)
	{
		
        //echo(sha1(md5($user['passwordUser'])));
        
        

		/* verificamos el usuario  */
		$this->db->select("*")->from("tb_user");
		$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.addresUser', 'left');
        $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
        $this->db->where("passwordUser =",sha1(md5($user['passwordUser'])));
        $this->db->where("emailUser =",$user['fullNameUser']);
        $query =$this->db->or_where("fullNameUser =",$user['fullNameUser'])->get();
		 
		
		if($query->num_rows() == 1){ 

			$user = $query->row_array();
            return $user;
        } 
        else
        {
            return null;
        }
	}


	 // GET DE LISTADO BUSQUEDA DE USUARIO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*,(SELECT COUNT(*)as tk_complit from tb_tickets  where idTenantKf = tb_user.idUser and idStatusTicketKf= 1) as tk_complit,
            (SELECT COUNT(*)as tk_incomplit from tb_tickets  where idTenantKf = tb_user.idUser and idStatusTicketKf= 2)as tk_incomplit")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);
            $quuery = $this->db->where("tb_user.idUser = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();
                return $rs;
            }
        } 
        else
         { 

            $this->db->select("*,(SELECT COUNT(*)as tk_complit from tb_tickets  where idTenantKf = tb_user.idUser and idStatusTicketKf= 1) as tk_complit,
            (SELECT COUNT(*)as tk_incomplit from tb_tickets  where idTenantKf = tb_user.idUser and idStatusTicketKf= 2)as tk_incomplit")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
			$this->db->where("tb_user.idStatusKf !=", -1);

       
                 /* Busqueda por filtro */
                 if (!is_null($searchFilter['searchFilter'])) 
                 {
                     $this->db->like('tb_user.fullNameUser', $searchFilter['searchFilter']);
                     $this->db->or_like('tb_user.emailUser', $searchFilter['searchFilter']);
                     $this->db->or_like('tb_user.phoneNumberUser', $searchFilter['searchFilter']);
                     $this->db->or_like('tb_user.phoneLocalNumberUser', $searchFilter['searchFilter']);
                     $this->db->or_like('tb_user.rezonSocial', $searchFilter['searchFilter']);
                 }


            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_user.idUser", "ASC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }



    /* AGRAGR NUEVO USUARIO EMPRESA */
    public function add($user) {

        /* CREAMOS UN USUARIO */
        $this->db->insert('tb_user', array(
            'fullNameUser' => $user['fullNameUser'],
            'emailUser' => $user['emailUser'],
            'phoneNumberUser' => $user['phoneNumberUser'],
            'phoneLocalNumberUser' => $user['phoneLocalNumberUser'],
            'addresUser' => $user['addresUser'],
            'passwordUser' => sha1(md5($user['passwordUser'])),
            'idProfileKf' => $user['idProfileKf'],
            'idStatusKf' => 0,
            'idCompanyKf' => $user['idCompanyKf'],
            'resetPasword' => 1
                )
        );

        if ($this->db->affected_rows() === 1) {
            $idUser = $this->db->insert_id();
            return $idUser;
        } else {
            return null;
        }
    }


    /* AGREGAR NUEVO ENCARGADO DE EDIFICIO */
    public function addAttendant($user) {
        
                /* CREAMOS UN USUARIO */
                $this->db->insert('tb_attendant', array(
                    'nameAttendant' => $user['nameAttendant'],
                    'idAddresKf' => $user['idAddresKf'],
                    'phoneAttendant' => $user['phoneAttendant'],
                    'phoneLocalAttendant' => $user['phoneLocalAttendant'],
                    'mailAttendant' => $user['mailAttendant'],
                    'hoursWork' => $user['hoursWork']
                        )
                );
        
                if ($this->db->affected_rows() === 1) {
                    $idUser = $this->db->insert_id();
                    return $idUser;
                } else {
                    return null;
                }
            }
 

    

    /* LISTADO DE FILTROS */
    public function getFilterForm() {

        $query = null;
        $profile = null;
        $status = null;
        $type = null;
        $company = null;


        $query =  $this->db->select("*")->from("tb_profile")->get();
        if ($query->num_rows() > 0) {
            $profile = $query->result_array();
        }

        $query =  $this->db->select("*")->from("tb_status")->get();
        if ($query->num_rows() > 0) {
            $status = $query->result_array();
        }

         $query =  $this->db->select("*")->from("tb_typetenant")->get();
        if ($query->num_rows() > 0) {
            $type = $query->result_array();
        }

        $query =  $this->db->select("*")->from("tb_company")->get();
        if ($query->num_rows() > 0) {
            $company = $query->result_array();
        }



        $filter = array(
            'status'  => $status,
            'profile' => $profile,
            'type' => $type,
            'company' => $company
        );

        return $filter;
    }


    
    /* LISTADO DE PARAMETROS */
    public function getParam() {
    
            $query = null;
            $param = null;
    
            $query =  $this->db->select("*")->from("tb_sys_param")->get();
            if ($query->num_rows() > 0) {
                $param = $query->result_array();
            }
    

         
            return $param;
    }


    /* LISTADO DE PARAMETROS */
    public function getdeliveryType() {
        
                $query = null;
                $param = null;
        
                $query =  $this->db->select("*")->from("tb_type_delivery")->get();
                if ($query->num_rows() > 0) {
                    $param = $query->result_array();
                }
    
                return $param;
        }


        
    


      /* LISTADO DE FILTROS */
      public function mailsmtp() {
        
               $param = null;
        
        
                $query =  $this->db->select("*")->from("tb_sys_param")->get();
                if ($query->num_rows() > 0) {
                    $param = $query->result_array();
                }
        
             
                return $param;
            }

    /* EDITAR DATOS DE UN EMPRESA */
    public function update($user) {

        $this->db->set(
                array(
                    'fullNameUser' => $user['fullNameUser'],
                    'emailUser' => $user['emailUser'],
                    'phoneNumberUser' => $user['phoneNumberUser'],
                    'phoneLocalNumberUser' => $user['phoneLocalNumberUser'],
                    'idProfileKf'=> $user['idProfileKf']
                )
        )->where("idUser", $user['idUser'])->update("tb_user");


        if (@$user['isEditUser']) {

            $this->db->set(
                    array(
                        'passwordUser' => sha1(md5($user['passwordUser'])),
                        'resetPasword' => 0
                    )
            )->where("idUser", $user['idUser'])->update("tb_user");
        }
        
        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


     /* EDITAR CLAVES  */
     public function updatePass($user) {
        
                $this->db->set(
                        array(
                            'passwordUser' => sha1(md5(12345)),
                            'resetPasword' => 1
                        )
                )->where("emailUser", $user['emailUser'])->update("tb_user");
        
                 /*MAIL*/
                 $title ="Nuevo Clave de Acceso a Coferba";
                 $body = "Se Restablecio su clave de acceso!<br> Usuario: ".$user['emailUser']."<br> Clave: 12345 <br> Le Recomendamos luego de acceder cambie su clave!";
                 $m = $this->mail_model->sendMail($title,$user['emailUser'],$body);

               
                
                if ($this->db->affected_rows() === 1) {
                   
                    return true;
                } else {
                    return false;
                }
            }

/* EDITAR DATOS DE UN EMPRESA */
public function updateMailSmtp($mail) {
    
            $this->db->set(
                    array(
                        'value' => $mail['email']
                    )
            )->where("idParam", 1)->update("tb_sys_param");
    
            $this->db->set(
                array(
                    'value' => $mail['pass']
                )
            )->where("idParam", 2)->update("tb_sys_param");
            
            if ($this->db->affected_rows() === 1) {
                return true;
            } else {
                return false;
            }
 }

 /* UPDATE PARAM */
 
 public function updateParam($param) {
    
            $this->db->set(
                    array(
                        'value' => $param['value']
                    )
            )->where("idParam", $param['idParam'])->update("tb_sys_param");
    
         
            if ($this->db->affected_rows() === 1) {
                return true;
            } else {
                return false;
            }
 }

    


    public function changueStatus($id, $idStatus) {
        $this->db->set(
                array(
                    'idStatusKf' => $idStatus
                )
        )->where("idUser", $id)->update("tb_user");


        if($idStatus == 1){

            $query = $this->db->select("*")->from("tb_user")
            ->where("idUser =", $id)->get();
            if ($query->num_rows() > 0) {
                $to = $query->row_array();
                
                /*MAIL*/
                $title ="Nuevo Acceso a Coferba";
                $body ="Ya Puede Disfrutar de Nuestros servicios!";
                $this->mail_model->sendMail($title,$to['emailUser'],$body);
            }
        


        }
      

        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }



    // GET DE LISTADO ENCARGADOS POR ID DIRECCION //
    public function attendantByIdDirecction($id) {
        $quuery = null;
        $rs = null;

        
            $this->db->select("*")->from("tb_attendant");
            $this->db->where("tb_attendant.idAddresKf =", $id);

            $quuery = $this->db->order_by("tb_attendant.nameAttendant", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        
    }


}
?>		