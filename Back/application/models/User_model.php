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
        
        //return sha1(md5($user['']));

		/* verificamos el usuario  */
		$this->db->select("*")->from("tb_user");
		$this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
        $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
        $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
        $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
        $this->db->where("passwordUser =",sha1(md5($user['passwordUser'])));
        $this->db->where("emailUser =",$user['fullNameUser']);
        $query =$this->db->or_where("fullNameUser =",$user['fullNameUser'])->get();
		 
		
		if($query->num_rows() == 1){ 

			$user = $query->row_array();

			$idProfiles = $user['idSysProfileFk'];
			if($idProfiles > 0){
					// Buscamos los perfiles de sistema //
					$this->db->select("*")->from("tb_profiles");
					$quuery = $this->db->where("tb_profiles.idProfiles =", $idProfiles)->get();
		
		
					if ($quuery->num_rows() === 1) {
						$rs =  $quuery->row_array();


						$this->db->select("*")->from("tb_profiles_modules");
						$this->db->join('tb_modules', 'tb_modules.idModule = tb_profiles_modules.idModuleFk', 'inner');
						$quuery = $this->db->where("tb_profiles_modules.idProfilesFk =", $idProfiles)->get();

						$rs2 =  $quuery->result_array();

						$user['modules'] =  $rs2;
					}
			}

            return $user;
        } 
        else
        {
            return null;
        }
    }
    

    

     // GET DE USUARIO NO ASOCIADOS A NINGUN DEPARTAMENTO//
     public function usernoregister($id) {
        $query = null;
        $rs = null;

            $sql = "
             SELECT distinct idUser,tb_user.idDepartmentKf,tb_user.* from tb_user 
             where idUser NOT in
            (SELECT distinct idUserKf as id from  tb_department as tbaux1 where  tbaux1.idDepartment=$id AND tbaux1.idUserKf != '' )
            AND  idUser NOT IN 
            (SELECT distinct idUser as id from  tb_user as tbaux2 where  tbaux2.idDepartmentKf  != '')
            AND tb_user.idStatusKf != -1 AND tb_user.idTypeTenantKf in (1,2)";

            
            $query = $this->db->query($sql);

            if ($query->num_rows() > 0) {
                $rs =  $query->result_array();
                return $rs;
            }
            
            return null;
            
        
    }


	 // GET DE LISTADO BUSQUEDA DE USUARIO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*")->from("tb_user");
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

            $this->db->select("*")->from("tb_user");
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



    /* AGRAGR NUEVO USUARIO DE CUALQUIER TIPO */
    public function add($user) {

        if($this->findUserByEmail($user['emailUser']) == null){
        $tokenMail = $this->generateRandomString();
        $ramdonPwd = $this->get_random_password();
        $isDepartmentApproved = null;
        $idStatusKfByAdmin = null;
        if (@$user['idTypeTenantKf']!=1 && @$user['idDepartmentKf'] && (@$user['isCreateByAdmin'] || @$user['isCreateByOwner']))
            {$isDepartmentApproved=1;}else{$isDepartmentApproved=null;}
        if (@$user['idTyepeAttendantKf']!=0 && @$user['isCreateByAdmin']){$idStatusKfByAdmin=1;}else{$idStatusKfByAdmin=0;}
        /* CREAMOS UN USUARIO */
        $this->db->insert('tb_user', array(
            'fullNameUser' => $user['fullNameUser'],
            'emailUser' => $user['emailUser'],
            'phoneNumberUser' => $user['phoneNumberUser'],
            'phoneLocalNumberUser' => @$user['phoneLocalNumberUser'],
            'idAddresKf' => @$user['idAddresKf'],
            'passwordUser' => sha1(md5($ramdonPwd)),
            'idProfileKf' => $user['idProfileKf'],
            'idTypeTenantKf' => $user['idTypeTenantKf'],
            'idStatusKf' => 0,
            'idCompanyKf' => @$user['idCompanyKf'],
            'idTyepeAttendantKf' => @$user['idTyepeAttendantKf'],
            'descOther' => @$user['descOther'],
            'idDepartmentKf' => @$user['idDepartmentKf'],
            'isDepartmentApproved' => $isDepartmentApproved,
            'isEdit' => @$user['isEdit'],
            'requireAuthentication' => @$user['requireAuthentication'],
            'resetPasword' => 1,
			'tokenMail' => $tokenMail,
			'idSysProfileFk'=> @$user['idSysProfileFk']
                )
        );
       


        if ($this->db->affected_rows() === 1) {
            // VALIDAMOS SI EL USER ESTA SIENDO CREADO POR UN ADMIN //
            if (@$user['isCreateByAdmin']) {

                $this->db->set(
                        array(
                            'isConfirmatedMail' => 1,
                            'idStatusKf' => 1
                        )
                )->where("emailUser", $user['emailUser'])->update("tb_user");
            }
             // ENVIAMOS EL MAIL DE CONFIRMAR REGISTRO //
            /*MAIL*/
            $title ="Mail de confirmacion de COFERBA";

            $currentURL = $this->get_the_current_url(); //for simple URL

            $body ='
            Usuario:'.$user['emailUser'].'
            <BR>'.'Clave:'.$ramdonPwd.'<br>'.'
            <a href='.$currentURL.'validate/'.$tokenMail.'>Pulse aqui para Confirmar mail</a>';

            $this->mail_model->sendMail($title,$user['emailUser'],$body);
            //*****************/

			$idUser = $this->db->insert_id();
			

			// Validamos que es de tipo coferba //
			if($user['idProfileKf'] == 1){

				
			}

            return $idUser;
        } else {
            return null;
        }
     }else{
         return -1;
     }
    }
    public function get_random_password($chars_min=6, $chars_max=8, $use_upper_case=false, $include_numbers='yes', $include_special_chars=false)
    {
        $length = rand($chars_min, $chars_max);
        $selection = 'aeuoyibcdfghjklmnpqrstvwxz';
        if($include_numbers) {
            $selection .= "1234567890";
        }
        if($include_special_chars) {
            $selection .= "!@\"#$%&[]{}?|";
        }
                                
        $password = "";
        for($i=0; $i<$length; $i++) {
            $current_letter = $use_upper_case ? (rand(0,1) ? strtoupper($selection[(rand() % strlen($selection))]) : $selection[(rand() % strlen($selection))]) : $selection[(rand() % strlen($selection))];            
            $password .=  $current_letter;
        }                
        
      return $password;
    }


     /* EDITAR CLAVES  */
    public function updatePass($user) {
        $recoverRamdonPwd = null;
        $recoverRamdonPwd = $this -> get_random_password();
                $this->db->set(
                        array(
                            'passwordUser' => sha1(md5($recoverRamdonPwd)),
                            'resetPasword' => 1
                        )
                )->where("emailUser", $user['emailUser'])->update("tb_user");
        
                 /*MAIL*/
                 $title ="Mail de Clave de Acceso a Coferba";
                 $body = "Se Restablecio su clave de acceso!<br> Usuario: ".$user['emailUser']."<br> Clave: ".$recoverRamdonPwd." <br> Le Recomendamos luego de acceder cambie su clave!";
                 $m = $this->mail_model->sendMail($title,$user['emailUser'],$body);

               
                
                if ($this->db->affected_rows() === 1) {
                   
                    return true;
                } else {
                    return false;
                }
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    public function get_the_current_url() {
    
        $protocol = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "https" : "http");
        $base_url = $protocol . "://" . $_SERVER['HTTP_HOST'];
        $complete_url =   $base_url . $_SERVER["REQUEST_URI"];
        
        return $complete_url;
         
    }


    public function updatecompany($user) {

        $this->db->set(
                array(
                    'nameCompany' => $user['nameCompany'],
                    'mail_services' => $user['mail_services'],
                    'mail_request' => $user['mail_request'],
                    'mail_admin' => $user['mail_admin'],
                    'isEdit' => $user['isEdit']
                )
        )->where("idCompany", $user['idCompany'])->update("tb_company");

        
        if ($this->db->affected_rows() === 1) {

            return true;
        } else {
            return false;
        }
    }
  


    /* EDITAR DATOS DE UN USUARIO */
    public function update($user) {

        $this->db->set(
                array(
                    'fullNameUser' => $user['fullNameUser'],
                    'emailUser' => $user['emailUser'],
                    'phoneNumberUser' => $user['phoneNumberUser'],
                    'phoneLocalNumberUser' => $user['phoneLocalNumberUser'],
                    'idAddresKf' => $user['idAddresKf'],
                    'idProfileKf' => $user['idProfileKf'],
                    'idCompanyKf' => $user['idCompanyKf'],
                    'idTyepeAttendantKf' => @$user['idTyepeAttendantKf'],
                    'descOther' => @$user['descOther'],
                    'idDepartmentKf' => @$user['idDepartmentKf'],
                    'idTypeTenantKf' => $user['idTypeTenantKf'],
                    'requireAuthentication' => @$user['requireAuthentication'],
                    'isDepartmentApproved' => @$user['isDepartmentApproved'],
                    'isEdit' => @$user['isEdit'],
                    'idSysProfileFk'=> @$user['idSysProfileFk']
                )
        )->where("idUser", $user['idUser'])->update("tb_user");

        
        if ($this->db->affected_rows() >=0) {

            if (@$user['isEditUser']) {

                $this->db->set(
                        array(
                            'passwordUser' => sha1(md5($user['passwordUser'])),
                            'resetPasword' => 0
                        )
                )->where("idUser", $user['idUser'])->update("tb_user");
            }

            return true;
        } else {
            return false;
        }
    }


    /*BUSCAR USUARIO POR EL EMAIL*/
    public function findUserByEmail($mail) {
    
            $user = null;
    
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $query = $this->db->where("tb_user.emailUser =", $mail)->get();
            if($query->num_rows() > 0){ 
                $user = $query->row_array();
                return $user;
            } 
            else
            {
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
        $companykeychains = null;


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
    public function getCompany() {
    
        $query = null;
        $company = null;

        $query =  $this->db->select("*")->from("tb_company")->get();
        if ($query->num_rows() > 0) {
            $company = $query->result_array();          
        }

        return $company;
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


 public function validate($tokenMail) {
    
    $this->db->set(
            array(
                'isConfirmatedMail' => 1,
                'idStatusKf' => 1
            )
    )->where("tokenMail",$tokenMail)->update("tb_user");

 
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



    /* ESTATUS DE UN USUARIO */
    public function changueStatusUser($id, $idStatus) {
        $this->db->set(
                array(
                    'idStatusKf' => $idStatus
                )
        )->where("idUser", $id)->update("tb_user");

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

        
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
            $this->db->where("tb_user.idAddresKf =", $id);
            $this->db->where("tb_user.idProfileKf =", 6);


            $quuery = $this->db->order_by("tb_user.fullNameUser", "asc")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;    
    }

     /* LISTADO DE FILTROS */
    public function getListOfUsers() {
        $where                = null;
        $clientUser           = null;
        $tenants              = null;
        $attendants           = null;
        $companyUser          = null;
        $sysUser              = null;
        /* LISTADO DE USUARIOS */
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
            $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
            $where = "idProfileKf!=1";
            $this->db->where($where);
            $query = $this->db->order_by("tb_user.dateCreated", "DESC")->get();
        if ($query->num_rows() > 0) {
            $clientUser = $query->result_array();
        }
         /* LISTADO DE INQUILINOS */
           
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
            $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
            $where="idProfileKf = 3 OR idProfileKf = 5 OR (idProfileKf = 6 AND idTypeTenantKf IN (1,2))";
            $this->db->where($where);
            $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
        if ($query->num_rows() > 0) {
            $tenants = $query->result_array();
        }
         /* LISTADO DE ENCARGADOS */
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
            $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
            $query = $this->db->where("idProfileKf",6)->order_by("tb_user.idUser", "ASC")->get();
        if ($query->num_rows() > 0) {
            $attendants = $query->result_array();
        }
         /* LISTADO DE ADMIN DE CONSORCIOS Y USUARIOS DE EMPRESAS */
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $this->db->where("idProfileKf",2);
            $this->db->or_where("idProfileKf",4);
            $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
        if ($query->num_rows() > 0) {
            $companyUser = $query->result_array();
        }
         /* LISTADO DE USUARIOS DE SISTEMA */
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_profiles', 'tb_profiles.idProfiles = tb_user.idSysProfileFk', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->where("idProfileKf",1);
            $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
        if ($query->num_rows() > 0) {
            $sysUser = $query->result_array();
        }

        $lists = array(
            'clientUser'                 => $clientUser,
            'tenants'                    => $tenants,
            'attendants'                 => $attendants,
            'companyUser'                => $companyUser,
            'sysUser'                    => $sysUser

        );

        return $lists;
    }

    


}
?>
