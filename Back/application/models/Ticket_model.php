<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ticket_model extends CI_Model
{
	
	public function __construct()
	{
        parent::__construct();
         /*MAIL*/ $this->load->model('mail_model');
	}


    private function formatCode($value) {
        $CODE = sprintf("%08d", $value);
        return $CODE;
    }


    public function find($id)
	{
        

        $this->db->select("*,DATEDIFF(ifnull(tb_tickets.dateAprovatedAdmin,now()),tb_tickets.dateCreated) as dayDif ,tb_tickets.dateCreated as dateCratedTicket")->from("tb_tickets");
        $this->db->join('tb_user tenant', 'tenant.idUser = tb_tickets.idUserTenantKf', 'left');
        $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf', 'left');
        $this->db->join('tb_statusticket', 'tb_statusticket.idTypeTicketKf = tb_tickets.idStatusTicketKf', 'left');
        $this->db->join('tb_type_delivery', 'tb_type_delivery.idTypeDelivery = tb_tickets.idTypeDeliveryKf', 'left');
        $this->db->join('tb_reason_disabled_item', 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets.idReasonDisabledItemKf', 'left');
        $this->db->join('tb_user a', 'a.idUser = tb_tickets.idUserCompany', 'left');
        $this->db->join('tb_user b', 'b.idUser = tb_tickets.idOWnerKf', 'left');
        $this->db->join('tb_user c', 'c.idUser = tb_tickets.idUserEnterpriceKf', 'left');
        $this->db->join('tb_user d', 'd.idUser = tb_tickets.idUserAdminKf', 'left');
        $this->db->join('tb_type_services', 'tb_type_services.idTypeServices = tb_tickets.idTypeServicesKf', 'left');
        $this->db->join('tb_addres', 'tb_addres.idAdress = tb_tickets.idAdressKf',  'left');      
        $this->db->join('tb_department', 'tb_department.idUserTenantKf = tb_user.idUser',  'left');            
        $query = $this->db->where("tb_tickets.idTicket =", @$id)->get();

		 
		
		if($query->num_rows() == 1){ 

			$user = $query->row_array();
            return $user;
        } 
        else
        {
            return null;
        }
	}


    

    public function aprobated($id) {
        $this->db->set(
                array(
                    'isAprobatedAdmin' => 1,
                    'dateAprovatedAdmin' => date("Y-m-d h:i:sa")
                )
        )->where("idTicket", $id)->update("tb_tickets");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


    public function cancel($id) {
        $this->db->set(
                array(
                    'isCancelTicket' => 1,
                    'dateCancel' => date("Y-m-d h:i:sa")
                )
        )->where("idTicket", $id)->update("tb_tickets");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


    public function changueStatus($id, $idStatus) {
        $this->db->set(
                array(
                    'idStatusTicketKf' => $idStatus
                )
        )->where("idTicket", $id)->update("tb_tickets");


        if ($this->db->affected_rows() === 1) {
            return true;
        } else {
            return false;
        }
    }


    public function add($ticket) {




    	 /* BUSCVAMOS UN CODIGO PARA ASIGNARLO */
    	 $codTicket ="";
    	 $getCodeSys = null;
            $query = $this->db->select("*")->from("tb_sys_code")
            ->where("idCode =", 1)->get();


            if ($query->num_rows() > 0) {
                $getCodeSys = $query->row_array();
                $codTicket = $getCodeSys['description'] . "-" .
                $this->formatCode($getCodeSys['code'] + 1);
            }

            $this->db->set(
                    array(
                        'code' => $getCodeSys['code'] + 1
                    )
            )->where("idCode =", 1)->update("tb_sys_code");

        /* CREAMOS UN TICKET */
        $this->db->insert('tb_tickets', array(
            'codTicket' => $codTicket,
            'idTypeTicketKf' => @$ticket['idTypeTicketKf'],
            'idUserTenantKf' => @$ticket['idUserTenantKf'],
            'numberItemes' => @$ticket['numberItemes'],
			'itemToDisabled' => @json_encode($ticket['itemToDisabled']),
            'idTypeOfKeysKf' => @json_encode($ticket['idTypeOfKeysKf']),
			'idReasonDisabledItemKf' => @$ticket['idReasonDisabledItemKf'],

            'idTypeDeliveryKf' => @$ticket['idTypeDeliveryKf'],
			'description' => @$ticket['description'],
			'idUserEnterpriceKf' => @$ticket['idUserEnterpriceKf'],
			'idTypeOuther' => @$ticket['idTypeOuther'],
			'mailContactConsult'  => @$ticket['mailContactConsult'],
			'idUserCompany'  =>  @$ticket['idUserCompany'],
			'idOWnerKf'  => @$ticket['idOWnerKf'],
			'idUserAdminKf'  => @$ticket['idUserAdminKf'],
			'descriptionOrder' => @$ticket['descriptionOrder'],
			'idTypeServicesKf'  => @$ticket['idTypeServicesKf'],

			'addressConsul'=> @$ticket['addressConsul'],
            'idProfileKf' => @$ticket['idProfileKf'],
            
            'idOpcionLowTicketKf' => @$ticket['idOpcionLowTicketKf'],
            'idUserAttendantKf' => @$ticket['idUserAttendantKf'],
            'idTypeOfOptionKf' => @$ticket['idTypeOfOptionKf'],
            'idDepartmentKf'=> @$ticket['idDepartmentKf'],
            'idCompanyKf' => @$ticket['idCompanyKf'],
            'totalService' => @$ticket['totalService'],
            'idAdressKf' => @$ticket['idAdressKf'],
            'idOtherKf' => @$ticket['idOtherKf'],

            'thirdPersonNames' => @$ticket['thirdPersonNames'],
            'thirdPersonPhone' => @$ticket['thirdPersonPhone'],
            'thirdPersonId' => @$ticket['thirdPersonId'],
            'idUserAttendantKfDelivery' => @$ticket['idUserAttKfDelive'],
            'sendUserNotification' => @$ticket['sendNotify'],
            'isNew' => @$ticket['isNew'],
            'idStatusTicketKf' => 2
		)
        );



        

        if ($this->db->affected_rows() === 1) {
            $idTicketKf = $this->db->insert_id();

            
        

            if(count(@$ticket['list_id_clients']) > 0)///para admnistradores
            {
            	foreach ($ticket['list_id_clients'] as $valor) {
				    
				    $this->db->insert('tb_clients_tickets', array(
		            'idTicketKf' => $idTicketKf,
		            'idClientKf' => $valor
				));
				}
            }


            $to = "";
            
            $idUser = 0;
            if(@$ticket['idUserEnterpriceKf'] > 0){
                $idUser =  @$ticket['idUserEnterpriceKf'];
             }

             if(@$ticket['idUserEnterpriceKf'] >0 ){
                $idUser =  @$ticket['idUserEnterpriceKf'];
             }

             if(@$ticket['idUserTenantKf'] > 0){
                $to['emailUser'] =  @$ticket['emailUser'];
             }

        if($idUser >0){
            $query =  $this->db->select("*")->from("tb_user")->where("idUser =", @$idUser)->get();
            if ($query->num_rows() > 0) {
                $to = $query->row_array();
            }
        }

        //echo $to['emailUser'];

            if($to != ""){
                    
                    /*MAIL*/
                    $title ="Nuevo Ticket Coferba (".$codTicket.")";
                    $body ="Tienes un Ticket que fue Recibido por Coferba, pronto Procesaran tu Solicitud!";
                    $this->mail_model->sendMail($title,$to['emailUser'],$body);
                
            }
        
           

            return true;
        } else {
            return null;
        }
    }



     // GET DE LISTADO BUSQUEDA DE TICKETS //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;


        $idUser = 0;

        if(!is_null($searchFilter['idUser']))
         {
            $idUser = $searchFilter['idUser'];
         }else{
            $idUser = $id;
         }



        // SI RECIBIMOS EL ID DE EL USUARIO //
        if ($idUser > 0) 
        {

            $this->db->select("*,DATEDIFF(ifnull(tb_tickets.dateAprovatedAdmin,now()),tb_tickets.dateCreated) as dayDif ,tb_tickets.dateCreated as dateCratedTicket")->from("tb_tickets");
            $this->db->join('tb_user as userTenant', 'tb_user.idUser = tb_tickets.idUserTenantKf', 'left');
            $this->db->join('tb_statusticket', 'tb_statusticket.idTypeTicketKf = tb_tickets.idStatusTicketKf', 'left');
            $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf', 'left');
            $this->db->join('tb_department', 'tb_department.idDepartment = tb_tickets.idDepartmentKf', 'left');
            $this->db->join('tb_user b', 'b.idUser = tb_tickets.idOWnerKf', 'left');
            $this->db->join('tb_type_delivery', 'tb_type_delivery.idTypeDelivery = tb_tickets.idTypeDeliveryKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_tickets.idAdressKf',  'left');      

            if(@$searchFilter['idAdress'] > 0)
            {
                $this->db->where("tb_addres.idAdress =", @$searchFilter['idAdress']);
            }

              if(@$searchFilter['idTypeTicketKf'] > 0)
            {
                $this->db->where("tb_tickets.idTypeTicketKf =", @$searchFilter['idTypeTicketKf']);
            }



              /* Busqueda por filtro */
            if (!is_null($searchFilter['searchFilter']) &&  strlen($searchFilter['searchFilter']) > 0) 
            {
                $this->db->like('tb_user.fullNameUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.phoneNumberUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_user.emailUser', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tickets.codTicket', $searchFilter['searchFilter']);
                $this->db->or_like('tb_addres.nameAdress', $searchFilter['searchFilter']);          
               
                
            }

             if(@$searchFilter['idStatusTicketKf'] > 0)
            {
                $this->db->where("tb_tickets.idStatusTicketKf =", @$searchFilter['idStatusTicketKf']);
            }else{

                if(@$searchFilter['idStatusTicketKf'] == null){
                     $this->db->where("tb_tickets.idStatusTicketKf !=", -1);

                }else{
                     $this->db->where("tb_tickets.idStatusTicketKf =", -1);

                }
            }



             if(@$searchFilter['idProfileKf'] == 3) // propietario 
                {
                    $this->db->where("(tb_user.idUser = ".$idUser." or tb_tickets.idOWnerKf =".@$searchFilter['idOWnerKf'].")",null,false);
                    $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();
                }
                else if(@$searchFilter['idProfileKf'] == 5) // Inquilino 
                {
                    $this->db->where("(tb_user.idUser = ".$idUser." or tb_tickets.idUserTenantKf =".@$searchFilter['idUserTenantKf'].")",null,false);
                    $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();
                }
                else if(@$searchFilter['idProfileKf'] == 6) // Encargado 
                {
                    $this->db->where("(tb_user.idUser = ".$idUser." or tb_tickets.idUserAttendantKf =".@$searchFilter['idUserAttendantKf'].")",null,false);
                    $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();
                }
                else{
                    $this->db->where("tb_user.idUser = ", $idUser);
                    $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();
                }


          if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
        } 
        else
         { 

            
            $this->db->select("*,
                CASE  
                  WHEN idUserCompany > 0 THEN a.fullNameUser
                  WHEN idOWnerKf > 0 THEN b.fullNameUser
                  WHEN idUserEnterpriceKf > 0 THEN c.fullNameUser
                  WHEN idUserAdminKf > 0 THEN d.fullNameUser
                  WHEN idUserTenantKf > 0 THEN g.fullNameUser
                  ELSE '' 
                END as fullNameUser,
                 a.fullNameUser as FullNameUserCompany,
                 b.fullNameUser as FullNameUserOwner,
                 c.fullNameUser as FullNameUserEnterprice,
                 d.fullNameUser as FullNameUserAdmin,
                 g.fullNameUser as FullUserTenant,
                CASE  
                  WHEN idUserCompany > 0 THEN a.phoneNumberUser
                  WHEN idOWnerKf > 0 THEN b.phoneNumberUser
                  WHEN idUserEnterpriceKf > 0 THEN c.phoneNumberUser
                  WHEN idUserAdminKf > 0 THEN d.phoneNumberUser
                  WHEN idUserTenantKf > 0 THEN g.phoneNumberUser
                  ELSE '' 
                END as phoneNumberUser,
                CASE  
                  WHEN idOtherKf > 0 THEN f.fullNameUser
                  WHEN idOtherKf < 1 THEN e.fullNameUser
                  ELSE ''
                END as nameAttendant,
                CASE  
                  WHEN idOtherKf > 0 THEN f.phoneNumberUser
                  WHEN idOtherKf < 1 THEN e.phoneNumberUser
                  ELSE '' 
                END as phoneAttendant,
                CASE  
                  WHEN idOtherKf > 0 THEN auxTypeA.nameTypeAttendant
                  WHEN idOtherKf < 1 THEN auxTypeB.nameTypeAttendant
                  ELSE '' 
                END as nameTypeAttendant

            ,DATEDIFF(ifnull(tb_tickets.dateAprovatedAdmin,now()),tb_tickets.dateCreated) as dayDif ,tb_tickets.dateCreated as dateCratedTicket")->from("tb_tickets");
            $this->db->join('tb_user g', 'g.idUser = tb_tickets.idUserTenantKf', 'left');

            $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf', 'left');
            $this->db->join('tb_statusticket', 'tb_statusticket.idTypeTicketKf = tb_tickets.idStatusTicketKf', 'left');
            $this->db->join('tb_type_delivery', 'tb_type_delivery.idTypeDelivery = tb_tickets.idTypeDeliveryKf', 'left');
            $this->db->join('tb_reason_disabled_item', 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets.idReasonDisabledItemKf', 'left');
            $this->db->join('tb_user e', 'e.idUser = tb_tickets.idUserAttendantKf', 'left');
            $this->db->join('tb_user f', 'f.idUser = tb_tickets.idOtherKf', 'left');
            $this->db->join('tb_type_attendant auxTypeA', 'auxTypeA.idTyepeAttendant = f.idTyepeAttendantKf', 'left');
            $this->db->join('tb_type_attendant auxTypeB', 'auxTypeB.idTyepeAttendant = e.idTyepeAttendantKf', 'left');

            $this->db->join('tb_department tid', 'tid.idDepartment = tb_tickets.idDepartmentKf', 'left');
            $this->db->join('tb_user a', 'a.idUser = tb_tickets.idUserCompany', 'left');

            if(@$searchFilter['idProfileKf']  == 1 || @$searchFilter['idProfileKf']  == 4 ||  @$searchFilter['idProfileKf']  == 2)
            {

             $this->db->join('tb_user b', 'b.idUser = tb_tickets.idOWnerKf', 'left');

            }else{
                 $this->db->join('tb_user b', 'b.idUser = tb_tickets.idOWnerKf', 'inner');
            }


            $this->db->join('tb_user c', 'c.idUser = tb_tickets.idUserEnterpriceKf', 'left');
            $this->db->join('tb_user d', 'd.idUser = tb_tickets.idUserAdminKf', 'left');
			$this->db->join('tb_type_services', 'tb_type_services.idTypeServices = tb_tickets.idTypeServicesKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_tickets.idAdressKf',  'left');      
           

            if(@$searchFilter['idProfileKf'] != 1 && @$searchFilter['idProfileKf'] != 4 && @$searchFilter['idProfileKf'] != 2)
            {
                $this->db->join('tb_department tidu', 'tidu.idUserKf = g.idUser',  'left');            
            }


            if(@$searchFilter['idCompanyKf'] > 0/* && @$searchFilter['idProfileKf'] != 4*/)
            {
                $this->db->where("tb_tickets.idCompanyKf =", @$searchFilter['idCompanyKf']);
                //$this->db->where("tb_tickets.idBranchKf >", 0);
            }

            if(@$searchFilter['idTypeTicketKf'] > 0)
            {
                $this->db->where("tb_tickets.idTypeTicketKf =", @$searchFilter['idTypeTicketKf']);
            }

            

            if(@$searchFilter['idStatusTicketKf'] > 0)
            {
                $this->db->where("tb_tickets.idStatusTicketKf =", @$searchFilter['idStatusTicketKf']);
            }else{

                if(@$searchFilter['idStatusTicketKf'] == null){
                     $this->db->where("tb_tickets.idStatusTicketKf !=", -1);

                }else{
                     $this->db->where("tb_tickets.idStatusTicketKf =", -1);

                }
            }

            if(@$searchFilter['idAdress'] > 0)
            {
                $this->db->where("tb_addres.idAdress =", @$searchFilter['idAdress']);
            }


           
            

            /* verificamos el id de perfil */
            if(@$searchFilter['idProfileKf'] > 0)
            {

               

                if(@$searchFilter['idProfileKf'] == 4 ) // admin consorcio 
                {
                    $this->db->where("tb_addres.idAdress  IN (select idAdress from tb_addres where idCompanyKf = ".@$searchFilter['idCompanyKf'].")", NULL, FALSE);

                }

                if( @$searchFilter['idProfileKf'] == 2) // empresa
                {
                    $this->db->where("tb_addres.idAdress  IN (select idAdress from tb_addres where idCompanyKf = ".@$searchFilter['idCompanyKf'].")", NULL, FALSE);
                    
                }
            }



            /* Busqueda por filtro */
            if (!is_null($searchFilter['searchFilter']) &&  strlen($searchFilter['searchFilter']) > 0) 
            {
            	
                 $this->db->where("
                            ( tb_user.fullNameUser like  '%".$searchFilter['searchFilter']."%'
                            or tb_user.phoneNumberUser like  '%".$searchFilter['searchFilter']."%'
                             or tb_user.emailUser like  '%".$searchFilter['searchFilter']."%'
                              or tb_tickets.codTicket like  '%".$searchFilter['searchFilter']."%'
                               or tb_addres.nameAdress like  '%".$searchFilter['searchFilter']."%'
                   ) ");
            
                
            }

            
          

            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();


            if ($quuery->num_rows() > 0) {

               
                foreach ($quuery->result() as &$row){

                    if($row->idTypeOfKeysKf != null){
                        if(isset(json_decode(@$row->idTypeOfKeysKf)->keys)){
                            foreach (json_decode(@$row->idTypeOfKeysKf)->keys as $row1){
                                if(isset($row1->idKeyKf)){
                                    $query =  $this->db->select("*")->from("tb_company_type_keychains")->where("idKey =", @$row1->idKeyKf)->get();
                                    
                                    if ($query->num_rows() > 0) {
                                        $row->listidTypeOfKeysKf = $query->result_array();
                                    }
                                }
                            }
                        }
                    }


                    if($row->itemToDisabled != null){
                        if(isset(json_decode(@$row->itemToDisabled)->keys)){
                            foreach (json_decode(@$row->itemToDisabled)->keys as $row1){
                                if(isset($row1->idKeyKf)){
                                    $query =  $this->db->select("*")->from("tb_company_type_keychains")->where("idKey =", @$row1->idKeyKf)->get();
                                    
                                    if ($query->num_rows() > 0) {
                                        $row->listitemToDisabled =  $query->result_array();
                                    }
                                    
                                }
                            }
                        }
                    }

                 

                }

               

                
                  

                return $quuery->result_array();
            }
            return null;
        }
    }


     /* LISTADO DE FILTROS */
    public function getFilterForm() {

        $user = null;
        $tenant = null;
        $attendant = null;
        $reason_disabled_item = null;
        $typedelivery = null;
        $typeouther  = null;
        $typeticket = null;
        $tipeOpcion = null;
        $statusticket = null;
        $typeattendant = null;
        

        /* LISTADO DE USUARIOS */
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
            $query = $this->db->order_by("tb_user.dateCreated", "DESC")->get();
        if ($query->num_rows() > 0) {
            $user = $query->result_array();
        }
         /* LISTADO DE INQUILINOS */
           
            $this->db->select("*")->from("tb_user");
            $this->db->join('tb_profile', 'tb_profile.idProfile = tb_user.idProfileKf', 'left');
            $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
            $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
            $this->db->where("idProfileKf",3);
            $this->db->or_where("idProfileKf",5);
            $query = $this->db->order_by("tb_user.idUser", "DESC")->get();
        if ($query->num_rows() > 0) {
            $tenant = $query->result_array();
        }
         /* LISTADO DE ENCARGADOS */
        $this->db->select("*")->from("tb_user");
        $this->db->join('tb_status', 'tb_status.idStatusTenant = tb_user.idStatusKf', 'left');
        $this->db->join('tb_company', 'tb_company.idCompany = tb_user.idCompanyKf', 'left');
        $this->db->join('tb_addres', 'tb_addres.idAdress = tb_user.idAddresKf', 'left');
        $this->db->join('tb_type_attendant', 'tb_type_attendant.idTyepeAttendant = tb_user.idTyepeAttendantKf', 'left');
        $query = $this->db->where("idProfileKf",6)->order_by("tb_user.idUser", "ASC")->get();
        if ($query->num_rows() > 0) {
            $attendant = $query->result_array();
        }
        /* LISTADO  */
        $query = $this->db->select("*")->from("tb_reason_disabled_item")->get();
        if ($query->num_rows() > 0) {
            $reason_disabled_item = $query->result_array();
        }


         /* LISTADO DE TIPOS DE ENVIOS */
        $query = $this->db->select("*")->from("tb_type_delivery")->get();
        if ($query->num_rows() > 0) {
            $typedelivery = $query->result_array();
        }

        /* LISTADO DE TIPOS DE CONSULTAS */
        $query = $this->db->select("*")->from("tb_type_outher")->get();
        if ($query->num_rows() > 0) {
            $typeouther = $query->result_array();
        }
        /* LISTADO DE TIPOS DE ENCARGADOS */
        $query = $this->db->select("*")->from("tb_type_attendant")->get();
        if ($query->num_rows() > 0) {
            $typeattendant = $query->result_array();
        }

         /* LISTADO DE TIPOS DE TICKETS*/
        $query = $this->db->select("*")->from("tb_typeticket")->get();
        if ($query->num_rows() > 0) {
            $typeticket = $query->result_array();
        }


          /* LISTADO */
          $query = $this->db->select("*")->from("tb_opcion_low")->get();
          if ($query->num_rows() > 0) {
              $tipeOpcion = $query->result_array();
          }

           /* LISTADO DE ESTATUS DE TICKETS */
           $query = $this->db->select("*")->from("tb_statusticket")->get();
           if ($query->num_rows() > 0) {
               $statusticket = $query->result_array();
           }

       

        $filter = array(
            'user'         => $user,
            'tenant'         => $tenant,
            'attendant'         => $attendant,
            'reason_disabled_item'      => $reason_disabled_item,
            'typedelivery' => $typedelivery,
            'typeouther' => $typeouther,
            'typeticket'  => $typeticket,
            'tipeOpcion' => $tipeOpcion,
            'statusticket' => $statusticket,
            'typeattendant' => $typeattendant

        );

        return $filter;
    }


    /* LISTADI DE TIPOS DE ENCARGADOS  */
    public function getTypeAttendant() {

        $typeAtendant = null;


        /* LISTADO DE CONDICIONES DE IVA */
        $query = $this->db->select("*")->from("tb_type_attendant")->order_by("tb_type_attendant.nameTypeAttendant", "DESC")->get();
        if ($query->num_rows() > 0) {
            $typeAtendant = $query->result_array();
        }


        return $typeAtendant;
    }


    /* LISTADI DE TIPOS DE ENCARGADOS  */
    public function verificateTicketByidUser($id) {

        $rs = null;


        /* LISTADO DE CONDICIONES DE IVA */
        $query = $this->db->select("*")->from("tb_tickets")
        ->where("idUserTenantKf",$id)
        ->where("idStatusTicketKf",2)
        ->or_where("idStatusTicketKf",3)->get();
        if ($query->num_rows() > 0) {
            $rs = $query->num_rows();
        }


        return $rs;
    }


}
?>