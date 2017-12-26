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
            'idTenantKf' => @$ticket['idTenantKf'],
            'numberItemes' => @$ticket['numberItemes'],
			'numberItemDisabled' => @$ticket['numberItemDisabled'],
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
            'idAttendantKf' => @$ticket['idAttendantKf'],

            'idBranchKf' => @$ticket['idBranchKf'],
            'idCompanyKf' => @$ticket['idCompanyKf'],
            'totalService' => @$ticket['totalService'],
            'idAdressKf' => @$ticket['idAdressKf']
            
            

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

             if(@$ticket['idTenantKf'] > 0){
                $to['emailUser'] =  @$ticket['emailTenant'];
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



     // GET DE LISTADO BUSQUEDA DE INQUIILINO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;


        $idTenant = 0;

        if(!is_null($searchFilter['idTenant']))
         {
            $idTenant = $searchFilter['idTenant'];
         }else{
            $idTenant = $id;
         }







        // SI RECIBIMOS EL ID DE EL USUARIO //
        if ($idTenant > 0) 
        {

            $this->db->select("*")->from("tb_tickets");
            $this->db->join('tb_tenant', 'tb_tenant.idTenant = tb_tickets.idTenantKf', 'left');
             $this->db->join('tb_statusticket', 'tb_statusticket.idTypeTicketKf = tb_tickets.idStatusTicketKf', 'left');
            $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf', 'left');
            $this->db->join('tb_branch', 'tb_branch.idBranch = tb_tickets.idBranchKf',  'left');     
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_branch.idAdressKf',  'left');      

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
                

                $this->db->like('tb_tenant.fullNameTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.phoneNumberTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.emailTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tickets.codTicket', $searchFilter['searchFilter']);
                $this->db->or_like('tb_addres.nameAdress', $searchFilter['searchFilter']);          
               
                
            }



             if(@$searchFilter['idProfileKf'] == 3) // prpietario 
                {
                        $this->db->where("(tb_tenant.idTenant = ".$idTenant." or tb_tickets.idOWnerKf =".@$searchFilter['idOWnerKf'].")",null,false);
                        $quuery = $this->db->get();
                        
                }else{
                     $quuery = $this->db->where("tb_tenant.idTenant = ", $idTenant)->get();
                }


           


          if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
        } 
        else
         { 

            
            $this->db->select("*,DATEDIFF(ifnull(tb_tickets.dateAprovatedAdmin,now()),tb_tickets.dateCreated) as dayDif ,tb_tickets.dateCreated as dateCratedTicket")->from("tb_tickets");
            $this->db->join('tb_tenant', 'tb_tenant.idTenant = tb_tickets.idTenantKf', 'left');
            $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf', 'left');
            $this->db->join('tb_statusticket', 'tb_statusticket.idTypeTicketKf = tb_tickets.idStatusTicketKf', 'left');
            $this->db->join('tb_type_delivery', 'tb_type_delivery.idTypeDelivery = tb_tickets.idTypeDeliveryKf', 'left');
            $this->db->join('tb_reason_disabled_item', 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets.idReasonDisabledItemKf', 'left');
            $this->db->join('tb_user a', 'a.idUser = tb_tickets.idUserCompany', 'left');
            $this->db->join('tb_user b', 'b.idUser = tb_tickets.idOWnerKf', 'left');
            $this->db->join('tb_user c', 'c.idUser = tb_tickets.idUserEnterpriceKf', 'left');
            $this->db->join('tb_user d', 'd.idUser = tb_tickets.idUserAdminKf', 'left');
			$this->db->join('tb_type_services', 'tb_type_services.idTypeServices = tb_tickets.idTypeServicesKf', 'left');
            $this->db->join('tb_branch', 'tb_branch.idBranch = tb_tickets.idBranchKf',  'left');     
            $this->db->join('tb_addres', 'tb_addres.idAdress = tb_branch.idAdressKf',  'left');                        
            $this->db->join('tb_department', 'tb_department.idTenantKf = tb_tenant.idTenant',  'left');            
            


            if(@$searchFilter['idCompanyKf'] > 0 && @$searchFilter['idProfileKf'] != 4)
            {
                $this->db->where("tb_tickets.idCompanyKf =", @$searchFilter['idCompanyKf']);
                $this->db->where("tb_tickets.idBranchKf >", 0);
            }

            if(@$searchFilter['idTypeTicketKf'] > 0)
            {
                $this->db->where("tb_tickets.idTypeTicketKf =", @$searchFilter['idTypeTicketKf']);
            }

            

            if(@$searchFilter['idStatusTicketKf'] > 0)
            {
                $this->db->where("tb_tickets.idStatusTicketKf =", @$searchFilter['idStatusTicketKf']);
            }else{
                $this->db->where("tb_tickets.idStatusTicketKf !=", -1);
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
                    $this->db->where("tb_branch.idAdressKf  IN (select idAdressKf from tb_branch where idCompanyKf = ".@$searchFilter['idCompanyKf'].")", NULL, FALSE);
                    
                }

                if( @$searchFilter['idProfileKf'] == 2) // empresa
                {
                    $this->db->where("tb_branch.idAdressKf  IN (select idAdressKf from tb_branch where idCompanyKf = ".@$searchFilter['idCompanyKf'].")", NULL, FALSE);
                    
                }
            }



            /* Busqueda por filtro */
            if (!is_null($searchFilter['searchFilter']) &&  strlen($searchFilter['searchFilter']) > 0) 
            {
            	

            	$this->db->like('tb_tenant.fullNameTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.phoneNumberTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.emailTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tickets.codTicket', $searchFilter['searchFilter']);
                $this->db->or_like('tb_addres.nameAdress', $searchFilter['searchFilter']);          
               
                
            }

            
          

            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }


     /* LISTADO DE FILTROS */

    public function getFilterForm() {

        $user = null;
        $reason_disabled_item = null;
        $typedelivery = null;
        $typeouther  = null;
        $typeticket = null;
        $tipeOpcion = null;
        $statusticket = null;
        

        /* LISTADO DE CONDICIONES DE IVA */
        $query = $this->db->select("*")->from("tb_user")->order_by("tb_user.dateCreated", "DESC")->get();
        if ($query->num_rows() > 0) {
            $user = $query->result_array();
        }

        /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_reason_disabled_item")->get();
        if ($query->num_rows() > 0) {
            $reason_disabled_item = $query->result_array();
        }


         /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_type_delivery")->get();
        if ($query->num_rows() > 0) {
            $typedelivery = $query->result_array();
        }

        /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_type_outher")->get();
        if ($query->num_rows() > 0) {
            $typeouther = $query->result_array();
        }

         /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_typeticket")->get();
        if ($query->num_rows() > 0) {
            $typeticket = $query->result_array();
        }


          /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
          $query = $this->db->select("*")->from("tb_opcion_low")->get();
          if ($query->num_rows() > 0) {
              $tipeOpcion = $query->result_array();
          }

           /* LISTADO DE ESTATUS */
           $query = $this->db->select("*")->from("tb_statusticket")->get();
           if ($query->num_rows() > 0) {
               $statusticket = $query->result_array();
           }

       

        $filter = array(
            'user'         => $user,
            'reason_disabled_item'      => $reason_disabled_item,
            'typedelivery' => $typedelivery,
            'typeouther' => $typeouther,
            'typeticket'  => $typeticket,
            'tipeOpcion' => $tipeOpcion,
            'statusticket' => $statusticket

        );

        return $filter;
    }


}
?>
